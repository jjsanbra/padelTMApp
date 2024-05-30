package com.padeltmapp.app.web.rest;

import static com.padeltmapp.app.domain.SponsorAsserts.*;
import static com.padeltmapp.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.padeltmapp.app.IntegrationTest;
import com.padeltmapp.app.domain.Sponsor;
import com.padeltmapp.app.repository.SponsorRepository;
import com.padeltmapp.app.service.dto.SponsorDTO;
import com.padeltmapp.app.service.mapper.SponsorMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SponsorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SponsorResourceIT {

    private static final String DEFAULT_SPONSOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SPONSOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/sponsors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SponsorRepository sponsorRepository;

    @Autowired
    private SponsorMapper sponsorMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSponsorMockMvc;

    private Sponsor sponsor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sponsor createEntity(EntityManager em) {
        Sponsor sponsor = new Sponsor().sponsorName(DEFAULT_SPONSOR_NAME).description(DEFAULT_DESCRIPTION);
        return sponsor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sponsor createUpdatedEntity(EntityManager em) {
        Sponsor sponsor = new Sponsor().sponsorName(UPDATED_SPONSOR_NAME).description(UPDATED_DESCRIPTION);
        return sponsor;
    }

    @BeforeEach
    public void initTest() {
        sponsor = createEntity(em);
    }

    @Test
    @Transactional
    void createSponsor() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);
        var returnedSponsorDTO = om.readValue(
            restSponsorMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sponsorDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SponsorDTO.class
        );

        // Validate the Sponsor in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedSponsor = sponsorMapper.toEntity(returnedSponsorDTO);
        assertSponsorUpdatableFieldsEquals(returnedSponsor, getPersistedSponsor(returnedSponsor));
    }

    @Test
    @Transactional
    void createSponsorWithExistingId() throws Exception {
        // Create the Sponsor with an existing ID
        sponsor.setId(1L);
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSponsorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sponsorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSponsorNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        sponsor.setSponsorName(null);

        // Create the Sponsor, which fails.
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        restSponsorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sponsorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllSponsors() throws Exception {
        // Initialize the database
        sponsorRepository.saveAndFlush(sponsor);

        // Get all the sponsorList
        restSponsorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sponsor.getId().intValue())))
            .andExpect(jsonPath("$.[*].sponsorName").value(hasItem(DEFAULT_SPONSOR_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getSponsor() throws Exception {
        // Initialize the database
        sponsorRepository.saveAndFlush(sponsor);

        // Get the sponsor
        restSponsorMockMvc
            .perform(get(ENTITY_API_URL_ID, sponsor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sponsor.getId().intValue()))
            .andExpect(jsonPath("$.sponsorName").value(DEFAULT_SPONSOR_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingSponsor() throws Exception {
        // Get the sponsor
        restSponsorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSponsor() throws Exception {
        // Initialize the database
        sponsorRepository.saveAndFlush(sponsor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sponsor
        Sponsor updatedSponsor = sponsorRepository.findById(sponsor.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedSponsor are not directly saved in db
        em.detach(updatedSponsor);
        updatedSponsor.sponsorName(UPDATED_SPONSOR_NAME).description(UPDATED_DESCRIPTION);
        SponsorDTO sponsorDTO = sponsorMapper.toDto(updatedSponsor);

        restSponsorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sponsorDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sponsorDTO))
            )
            .andExpect(status().isOk());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSponsorToMatchAllProperties(updatedSponsor);
    }

    @Test
    @Transactional
    void putNonExistingSponsor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sponsor.setId(longCount.incrementAndGet());

        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSponsorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sponsorDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sponsorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSponsor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sponsor.setId(longCount.incrementAndGet());

        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSponsorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(sponsorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSponsor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sponsor.setId(longCount.incrementAndGet());

        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSponsorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(sponsorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSponsorWithPatch() throws Exception {
        // Initialize the database
        sponsorRepository.saveAndFlush(sponsor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sponsor using partial update
        Sponsor partialUpdatedSponsor = new Sponsor();
        partialUpdatedSponsor.setId(sponsor.getId());

        partialUpdatedSponsor.description(UPDATED_DESCRIPTION);

        restSponsorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSponsor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSponsor))
            )
            .andExpect(status().isOk());

        // Validate the Sponsor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSponsorUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedSponsor, sponsor), getPersistedSponsor(sponsor));
    }

    @Test
    @Transactional
    void fullUpdateSponsorWithPatch() throws Exception {
        // Initialize the database
        sponsorRepository.saveAndFlush(sponsor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the sponsor using partial update
        Sponsor partialUpdatedSponsor = new Sponsor();
        partialUpdatedSponsor.setId(sponsor.getId());

        partialUpdatedSponsor.sponsorName(UPDATED_SPONSOR_NAME).description(UPDATED_DESCRIPTION);

        restSponsorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSponsor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSponsor))
            )
            .andExpect(status().isOk());

        // Validate the Sponsor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSponsorUpdatableFieldsEquals(partialUpdatedSponsor, getPersistedSponsor(partialUpdatedSponsor));
    }

    @Test
    @Transactional
    void patchNonExistingSponsor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sponsor.setId(longCount.incrementAndGet());

        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSponsorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sponsorDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(sponsorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSponsor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sponsor.setId(longCount.incrementAndGet());

        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSponsorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(sponsorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSponsor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        sponsor.setId(longCount.incrementAndGet());

        // Create the Sponsor
        SponsorDTO sponsorDTO = sponsorMapper.toDto(sponsor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSponsorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(sponsorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sponsor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSponsor() throws Exception {
        // Initialize the database
        sponsorRepository.saveAndFlush(sponsor);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the sponsor
        restSponsorMockMvc
            .perform(delete(ENTITY_API_URL_ID, sponsor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return sponsorRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Sponsor getPersistedSponsor(Sponsor sponsor) {
        return sponsorRepository.findById(sponsor.getId()).orElseThrow();
    }

    protected void assertPersistedSponsorToMatchAllProperties(Sponsor expectedSponsor) {
        assertSponsorAllPropertiesEquals(expectedSponsor, getPersistedSponsor(expectedSponsor));
    }

    protected void assertPersistedSponsorToMatchUpdatableProperties(Sponsor expectedSponsor) {
        assertSponsorAllUpdatablePropertiesEquals(expectedSponsor, getPersistedSponsor(expectedSponsor));
    }
}
