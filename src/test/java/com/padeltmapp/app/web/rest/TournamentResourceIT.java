package com.padeltmapp.app.web.rest;

import static com.padeltmapp.app.domain.TournamentAsserts.*;
import static com.padeltmapp.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.padeltmapp.app.IntegrationTest;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.repository.TournamentRepository;
import com.padeltmapp.app.service.TournamentService;
import com.padeltmapp.app.service.dto.TournamentDTO;
import com.padeltmapp.app.service.mapper.TournamentMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
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
 * Integration tests for the {@link TournamentResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class TournamentResourceIT {

    private static final String DEFAULT_TOURNAMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TOURNAMENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_INSCRIPTIONS_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_INSCRIPTIONS_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_MAX_TEAMS_ALLOWED = 4;
    private static final Integer UPDATED_MAX_TEAMS_ALLOWED = 5;

    private static final String DEFAULT_PRICES = "AAAAAAAAAA";
    private static final String UPDATED_PRICES = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final byte[] DEFAULT_POSTER = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_POSTER = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_POSTER_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_POSTER_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/tournaments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Mock
    private TournamentRepository tournamentRepositoryMock;

    @Autowired
    private TournamentMapper tournamentMapper;

    @Mock
    private TournamentService tournamentServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTournamentMockMvc;

    private Tournament tournament;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tournament createEntity(EntityManager em) {
        Tournament tournament = new Tournament()
            .tournamentName(DEFAULT_TOURNAMENT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .lastInscriptionsDate(DEFAULT_LAST_INSCRIPTIONS_DATE)
            .maxTeamsAllowed(DEFAULT_MAX_TEAMS_ALLOWED)
            .prices(DEFAULT_PRICES)
            .active(DEFAULT_ACTIVE)
            .poster(DEFAULT_POSTER)
            .posterContentType(DEFAULT_POSTER_CONTENT_TYPE);
        return tournament;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tournament createUpdatedEntity(EntityManager em) {
        Tournament tournament = new Tournament()
            .tournamentName(UPDATED_TOURNAMENT_NAME)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .lastInscriptionsDate(UPDATED_LAST_INSCRIPTIONS_DATE)
            .maxTeamsAllowed(UPDATED_MAX_TEAMS_ALLOWED)
            .prices(UPDATED_PRICES)
            .active(UPDATED_ACTIVE)
            .poster(UPDATED_POSTER)
            .posterContentType(UPDATED_POSTER_CONTENT_TYPE);
        return tournament;
    }

    @BeforeEach
    public void initTest() {
        tournament = createEntity(em);
    }

    @Test
    @Transactional
    void createTournament() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);
        var returnedTournamentDTO = om.readValue(
            restTournamentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tournamentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TournamentDTO.class
        );

        // Validate the Tournament in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTournament = tournamentMapper.toEntity(returnedTournamentDTO);
        assertTournamentUpdatableFieldsEquals(returnedTournament, getPersistedTournament(returnedTournament));
    }

    @Test
    @Transactional
    void createTournamentWithExistingId() throws Exception {
        // Create the Tournament with an existing ID
        tournament.setId(1L);
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTournamentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tournamentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTournaments() throws Exception {
        // Initialize the database
        tournamentRepository.saveAndFlush(tournament);

        // Get all the tournamentList
        restTournamentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tournament.getId().intValue())))
            .andExpect(jsonPath("$.[*].tournamentName").value(hasItem(DEFAULT_TOURNAMENT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastInscriptionsDate").value(hasItem(DEFAULT_LAST_INSCRIPTIONS_DATE.toString())))
            .andExpect(jsonPath("$.[*].maxTeamsAllowed").value(hasItem(DEFAULT_MAX_TEAMS_ALLOWED)))
            .andExpect(jsonPath("$.[*].prices").value(hasItem(DEFAULT_PRICES)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].posterContentType").value(hasItem(DEFAULT_POSTER_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].poster").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_POSTER))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTournamentsWithEagerRelationshipsIsEnabled() throws Exception {
        when(tournamentServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTournamentMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(tournamentServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTournamentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(tournamentServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTournamentMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(tournamentRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getTournament() throws Exception {
        // Initialize the database
        tournamentRepository.saveAndFlush(tournament);

        // Get the tournament
        restTournamentMockMvc
            .perform(get(ENTITY_API_URL_ID, tournament.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tournament.getId().intValue()))
            .andExpect(jsonPath("$.tournamentName").value(DEFAULT_TOURNAMENT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.lastInscriptionsDate").value(DEFAULT_LAST_INSCRIPTIONS_DATE.toString()))
            .andExpect(jsonPath("$.maxTeamsAllowed").value(DEFAULT_MAX_TEAMS_ALLOWED))
            .andExpect(jsonPath("$.prices").value(DEFAULT_PRICES))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.posterContentType").value(DEFAULT_POSTER_CONTENT_TYPE))
            .andExpect(jsonPath("$.poster").value(Base64.getEncoder().encodeToString(DEFAULT_POSTER)));
    }

    @Test
    @Transactional
    void getNonExistingTournament() throws Exception {
        // Get the tournament
        restTournamentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTournament() throws Exception {
        // Initialize the database
        tournamentRepository.saveAndFlush(tournament);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tournament
        Tournament updatedTournament = tournamentRepository.findById(tournament.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTournament are not directly saved in db
        em.detach(updatedTournament);
        updatedTournament
            .tournamentName(UPDATED_TOURNAMENT_NAME)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .lastInscriptionsDate(UPDATED_LAST_INSCRIPTIONS_DATE)
            .maxTeamsAllowed(UPDATED_MAX_TEAMS_ALLOWED)
            .prices(UPDATED_PRICES)
            .active(UPDATED_ACTIVE)
            .poster(UPDATED_POSTER)
            .posterContentType(UPDATED_POSTER_CONTENT_TYPE);
        TournamentDTO tournamentDTO = tournamentMapper.toDto(updatedTournament);

        restTournamentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tournamentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tournamentDTO))
            )
            .andExpect(status().isOk());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTournamentToMatchAllProperties(updatedTournament);
    }

    @Test
    @Transactional
    void putNonExistingTournament() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tournament.setId(longCount.incrementAndGet());

        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTournamentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tournamentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tournamentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTournament() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tournament.setId(longCount.incrementAndGet());

        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTournamentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tournamentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTournament() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tournament.setId(longCount.incrementAndGet());

        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTournamentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tournamentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTournamentWithPatch() throws Exception {
        // Initialize the database
        tournamentRepository.saveAndFlush(tournament);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tournament using partial update
        Tournament partialUpdatedTournament = new Tournament();
        partialUpdatedTournament.setId(tournament.getId());

        partialUpdatedTournament
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .lastInscriptionsDate(UPDATED_LAST_INSCRIPTIONS_DATE)
            .poster(UPDATED_POSTER)
            .posterContentType(UPDATED_POSTER_CONTENT_TYPE);

        restTournamentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTournament.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTournament))
            )
            .andExpect(status().isOk());

        // Validate the Tournament in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTournamentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTournament, tournament),
            getPersistedTournament(tournament)
        );
    }

    @Test
    @Transactional
    void fullUpdateTournamentWithPatch() throws Exception {
        // Initialize the database
        tournamentRepository.saveAndFlush(tournament);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tournament using partial update
        Tournament partialUpdatedTournament = new Tournament();
        partialUpdatedTournament.setId(tournament.getId());

        partialUpdatedTournament
            .tournamentName(UPDATED_TOURNAMENT_NAME)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .lastInscriptionsDate(UPDATED_LAST_INSCRIPTIONS_DATE)
            .maxTeamsAllowed(UPDATED_MAX_TEAMS_ALLOWED)
            .prices(UPDATED_PRICES)
            .active(UPDATED_ACTIVE)
            .poster(UPDATED_POSTER)
            .posterContentType(UPDATED_POSTER_CONTENT_TYPE);

        restTournamentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTournament.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTournament))
            )
            .andExpect(status().isOk());

        // Validate the Tournament in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTournamentUpdatableFieldsEquals(partialUpdatedTournament, getPersistedTournament(partialUpdatedTournament));
    }

    @Test
    @Transactional
    void patchNonExistingTournament() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tournament.setId(longCount.incrementAndGet());

        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTournamentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tournamentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(tournamentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTournament() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tournament.setId(longCount.incrementAndGet());

        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTournamentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(tournamentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTournament() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tournament.setId(longCount.incrementAndGet());

        // Create the Tournament
        TournamentDTO tournamentDTO = tournamentMapper.toDto(tournament);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTournamentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(tournamentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tournament in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTournament() throws Exception {
        // Initialize the database
        tournamentRepository.saveAndFlush(tournament);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the tournament
        restTournamentMockMvc
            .perform(delete(ENTITY_API_URL_ID, tournament.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return tournamentRepository.count();
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

    protected Tournament getPersistedTournament(Tournament tournament) {
        return tournamentRepository.findById(tournament.getId()).orElseThrow();
    }

    protected void assertPersistedTournamentToMatchAllProperties(Tournament expectedTournament) {
        assertTournamentAllPropertiesEquals(expectedTournament, getPersistedTournament(expectedTournament));
    }

    protected void assertPersistedTournamentToMatchUpdatableProperties(Tournament expectedTournament) {
        assertTournamentAllUpdatablePropertiesEquals(expectedTournament, getPersistedTournament(expectedTournament));
    }
}
