package com.padeltmapp.app.web.rest;

import static com.padeltmapp.app.domain.RegisterTeamAsserts.*;
import static com.padeltmapp.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.padeltmapp.app.IntegrationTest;
import com.padeltmapp.app.domain.RegisterTeam;
import com.padeltmapp.app.domain.Team;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.repository.RegisterTeamRepository;
import com.padeltmapp.app.service.RegisterTeamService;
import com.padeltmapp.app.service.dto.RegisterTeamDTO;
import com.padeltmapp.app.service.mapper.RegisterTeamMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RegisterTeamResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class RegisterTeamResourceIT {

    private static final Instant DEFAULT_REGISTER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REGISTER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/register-teams";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private RegisterTeamRepository registerTeamRepository;

    @Mock
    private RegisterTeamRepository registerTeamRepositoryMock;

    @Autowired
    private RegisterTeamMapper registerTeamMapper;

    @Mock
    private RegisterTeamService registerTeamServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRegisterTeamMockMvc;

    private RegisterTeam registerTeam;

    private RegisterTeam insertedRegisterTeam;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegisterTeam createEntity(EntityManager em) {
        RegisterTeam registerTeam = new RegisterTeam().registerDate(DEFAULT_REGISTER_DATE);
        // Add required entity
        Team team;
        if (TestUtil.findAll(em, Team.class).isEmpty()) {
            team = TeamResourceIT.createEntity(em);
            em.persist(team);
            em.flush();
        } else {
            team = TestUtil.findAll(em, Team.class).get(0);
        }
        registerTeam.setTeam(team);
        // Add required entity
        Tournament tournament;
        if (TestUtil.findAll(em, Tournament.class).isEmpty()) {
            tournament = TournamentResourceIT.createEntity(em);
            em.persist(tournament);
            em.flush();
        } else {
            tournament = TestUtil.findAll(em, Tournament.class).get(0);
        }
        registerTeam.getTournaments().add(tournament);
        return registerTeam;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegisterTeam createUpdatedEntity(EntityManager em) {
        RegisterTeam registerTeam = new RegisterTeam().registerDate(UPDATED_REGISTER_DATE);
        // Add required entity
        Team team;
        if (TestUtil.findAll(em, Team.class).isEmpty()) {
            team = TeamResourceIT.createUpdatedEntity(em);
            em.persist(team);
            em.flush();
        } else {
            team = TestUtil.findAll(em, Team.class).get(0);
        }
        registerTeam.setTeam(team);
        // Add required entity
        Tournament tournament;
        if (TestUtil.findAll(em, Tournament.class).isEmpty()) {
            tournament = TournamentResourceIT.createUpdatedEntity(em);
            em.persist(tournament);
            em.flush();
        } else {
            tournament = TestUtil.findAll(em, Tournament.class).get(0);
        }
        registerTeam.getTournaments().add(tournament);
        return registerTeam;
    }

    @BeforeEach
    public void initTest() {
        registerTeam = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedRegisterTeam != null) {
            registerTeamRepository.delete(insertedRegisterTeam);
            insertedRegisterTeam = null;
        }
    }

    @Test
    @Transactional
    void createRegisterTeam() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);
        var returnedRegisterTeamDTO = om.readValue(
            restRegisterTeamMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(registerTeamDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            RegisterTeamDTO.class
        );

        // Validate the RegisterTeam in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedRegisterTeam = registerTeamMapper.toEntity(returnedRegisterTeamDTO);
        assertRegisterTeamUpdatableFieldsEquals(returnedRegisterTeam, getPersistedRegisterTeam(returnedRegisterTeam));

        insertedRegisterTeam = returnedRegisterTeam;
    }

    @Test
    @Transactional
    void createRegisterTeamWithExistingId() throws Exception {
        // Create the RegisterTeam with an existing ID
        registerTeam.setId(1L);
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegisterTeamMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(registerTeamDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkRegisterDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        registerTeam.setRegisterDate(null);

        // Create the RegisterTeam, which fails.
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        restRegisterTeamMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(registerTeamDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRegisterTeams() throws Exception {
        // Initialize the database
        insertedRegisterTeam = registerTeamRepository.saveAndFlush(registerTeam);

        // Get all the registerTeamList
        restRegisterTeamMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(registerTeam.getId().intValue())))
            .andExpect(jsonPath("$.[*].registerDate").value(hasItem(DEFAULT_REGISTER_DATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllRegisterTeamsWithEagerRelationshipsIsEnabled() throws Exception {
        when(registerTeamServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRegisterTeamMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(registerTeamServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllRegisterTeamsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(registerTeamServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRegisterTeamMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(registerTeamRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getRegisterTeam() throws Exception {
        // Initialize the database
        insertedRegisterTeam = registerTeamRepository.saveAndFlush(registerTeam);

        // Get the registerTeam
        restRegisterTeamMockMvc
            .perform(get(ENTITY_API_URL_ID, registerTeam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(registerTeam.getId().intValue()))
            .andExpect(jsonPath("$.registerDate").value(DEFAULT_REGISTER_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingRegisterTeam() throws Exception {
        // Get the registerTeam
        restRegisterTeamMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRegisterTeam() throws Exception {
        // Initialize the database
        insertedRegisterTeam = registerTeamRepository.saveAndFlush(registerTeam);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the registerTeam
        RegisterTeam updatedRegisterTeam = registerTeamRepository.findById(registerTeam.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedRegisterTeam are not directly saved in db
        em.detach(updatedRegisterTeam);
        updatedRegisterTeam.registerDate(UPDATED_REGISTER_DATE);
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(updatedRegisterTeam);

        restRegisterTeamMockMvc
            .perform(
                put(ENTITY_API_URL_ID, registerTeamDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(registerTeamDTO))
            )
            .andExpect(status().isOk());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedRegisterTeamToMatchAllProperties(updatedRegisterTeam);
    }

    @Test
    @Transactional
    void putNonExistingRegisterTeam() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        registerTeam.setId(longCount.incrementAndGet());

        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegisterTeamMockMvc
            .perform(
                put(ENTITY_API_URL_ID, registerTeamDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(registerTeamDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRegisterTeam() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        registerTeam.setId(longCount.incrementAndGet());

        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegisterTeamMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(registerTeamDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRegisterTeam() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        registerTeam.setId(longCount.incrementAndGet());

        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegisterTeamMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(registerTeamDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRegisterTeamWithPatch() throws Exception {
        // Initialize the database
        insertedRegisterTeam = registerTeamRepository.saveAndFlush(registerTeam);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the registerTeam using partial update
        RegisterTeam partialUpdatedRegisterTeam = new RegisterTeam();
        partialUpdatedRegisterTeam.setId(registerTeam.getId());

        partialUpdatedRegisterTeam.registerDate(UPDATED_REGISTER_DATE);

        restRegisterTeamMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRegisterTeam.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedRegisterTeam))
            )
            .andExpect(status().isOk());

        // Validate the RegisterTeam in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertRegisterTeamUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedRegisterTeam, registerTeam),
            getPersistedRegisterTeam(registerTeam)
        );
    }

    @Test
    @Transactional
    void fullUpdateRegisterTeamWithPatch() throws Exception {
        // Initialize the database
        insertedRegisterTeam = registerTeamRepository.saveAndFlush(registerTeam);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the registerTeam using partial update
        RegisterTeam partialUpdatedRegisterTeam = new RegisterTeam();
        partialUpdatedRegisterTeam.setId(registerTeam.getId());

        partialUpdatedRegisterTeam.registerDate(UPDATED_REGISTER_DATE);

        restRegisterTeamMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRegisterTeam.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedRegisterTeam))
            )
            .andExpect(status().isOk());

        // Validate the RegisterTeam in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertRegisterTeamUpdatableFieldsEquals(partialUpdatedRegisterTeam, getPersistedRegisterTeam(partialUpdatedRegisterTeam));
    }

    @Test
    @Transactional
    void patchNonExistingRegisterTeam() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        registerTeam.setId(longCount.incrementAndGet());

        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegisterTeamMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, registerTeamDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(registerTeamDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRegisterTeam() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        registerTeam.setId(longCount.incrementAndGet());

        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegisterTeamMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(registerTeamDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRegisterTeam() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        registerTeam.setId(longCount.incrementAndGet());

        // Create the RegisterTeam
        RegisterTeamDTO registerTeamDTO = registerTeamMapper.toDto(registerTeam);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegisterTeamMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(registerTeamDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RegisterTeam in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRegisterTeam() throws Exception {
        // Initialize the database
        insertedRegisterTeam = registerTeamRepository.saveAndFlush(registerTeam);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the registerTeam
        restRegisterTeamMockMvc
            .perform(delete(ENTITY_API_URL_ID, registerTeam.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return registerTeamRepository.count();
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

    protected RegisterTeam getPersistedRegisterTeam(RegisterTeam registerTeam) {
        return registerTeamRepository.findById(registerTeam.getId()).orElseThrow();
    }

    protected void assertPersistedRegisterTeamToMatchAllProperties(RegisterTeam expectedRegisterTeam) {
        assertRegisterTeamAllPropertiesEquals(expectedRegisterTeam, getPersistedRegisterTeam(expectedRegisterTeam));
    }

    protected void assertPersistedRegisterTeamToMatchUpdatableProperties(RegisterTeam expectedRegisterTeam) {
        assertRegisterTeamAllUpdatablePropertiesEquals(expectedRegisterTeam, getPersistedRegisterTeam(expectedRegisterTeam));
    }
}
