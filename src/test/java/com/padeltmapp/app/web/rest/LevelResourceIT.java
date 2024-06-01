package com.padeltmapp.app.web.rest;

import static com.padeltmapp.app.domain.LevelAsserts.*;
import static com.padeltmapp.app.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.padeltmapp.app.IntegrationTest;
import com.padeltmapp.app.domain.Level;
import com.padeltmapp.app.repository.LevelRepository;
import com.padeltmapp.app.service.dto.LevelDTO;
import com.padeltmapp.app.service.mapper.LevelMapper;
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
 * Integration tests for the {@link LevelResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LevelResourceIT {

    private static final String DEFAULT_LEVEL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/levels";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private LevelMapper levelMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLevelMockMvc;

    private Level level;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Level createEntity(EntityManager em) {
        Level level = new Level().levelName(DEFAULT_LEVEL_NAME).description(DEFAULT_DESCRIPTION);
        return level;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Level createUpdatedEntity(EntityManager em) {
        Level level = new Level().levelName(UPDATED_LEVEL_NAME).description(UPDATED_DESCRIPTION);
        return level;
    }

    @BeforeEach
    public void initTest() {
        level = createEntity(em);
    }

    @Test
    @Transactional
    void createLevel() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);
        var returnedLevelDTO = om.readValue(
            restLevelMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LevelDTO.class
        );

        // Validate the Level in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLevel = levelMapper.toEntity(returnedLevelDTO);
        assertLevelUpdatableFieldsEquals(returnedLevel, getPersistedLevel(returnedLevel));
    }

    @Test
    @Transactional
    void createLevelWithExistingId() throws Exception {
        // Create the Level with an existing ID
        level.setId(1L);
        LevelDTO levelDTO = levelMapper.toDto(level);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkLevelNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        level.setLevelName(null);

        // Create the Level, which fails.
        LevelDTO levelDTO = levelMapper.toDto(level);

        restLevelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllLevels() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        // Get all the levelList
        restLevelMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(level.getId().intValue())))
            .andExpect(jsonPath("$.[*].levelName").value(hasItem(DEFAULT_LEVEL_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getLevel() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        // Get the level
        restLevelMockMvc
            .perform(get(ENTITY_API_URL_ID, level.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(level.getId().intValue()))
            .andExpect(jsonPath("$.levelName").value(DEFAULT_LEVEL_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingLevel() throws Exception {
        // Get the level
        restLevelMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLevel() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the level
        Level updatedLevel = levelRepository.findById(level.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLevel are not directly saved in db
        em.detach(updatedLevel);
        updatedLevel.levelName(UPDATED_LEVEL_NAME).description(UPDATED_DESCRIPTION);
        LevelDTO levelDTO = levelMapper.toDto(updatedLevel);

        restLevelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, levelDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelDTO))
            )
            .andExpect(status().isOk());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLevelToMatchAllProperties(updatedLevel);
    }

    @Test
    @Transactional
    void putNonExistingLevel() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        level.setId(longCount.incrementAndGet());

        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, levelDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLevel() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        level.setId(longCount.incrementAndGet());

        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(levelDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLevel() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        level.setId(longCount.incrementAndGet());

        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLevelWithPatch() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the level using partial update
        Level partialUpdatedLevel = new Level();
        partialUpdatedLevel.setId(level.getId());

        partialUpdatedLevel.description(UPDATED_DESCRIPTION);

        restLevelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLevel.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLevel))
            )
            .andExpect(status().isOk());

        // Validate the Level in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLevelUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedLevel, level), getPersistedLevel(level));
    }

    @Test
    @Transactional
    void fullUpdateLevelWithPatch() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the level using partial update
        Level partialUpdatedLevel = new Level();
        partialUpdatedLevel.setId(level.getId());

        partialUpdatedLevel.levelName(UPDATED_LEVEL_NAME).description(UPDATED_DESCRIPTION);

        restLevelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLevel.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLevel))
            )
            .andExpect(status().isOk());

        // Validate the Level in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLevelUpdatableFieldsEquals(partialUpdatedLevel, getPersistedLevel(partialUpdatedLevel));
    }

    @Test
    @Transactional
    void patchNonExistingLevel() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        level.setId(longCount.incrementAndGet());

        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, levelDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(levelDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLevel() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        level.setId(longCount.incrementAndGet());

        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(levelDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLevel() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        level.setId(longCount.incrementAndGet());

        // Create the Level
        LevelDTO levelDTO = levelMapper.toDto(level);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(levelDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Level in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLevel() throws Exception {
        // Initialize the database
        levelRepository.saveAndFlush(level);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the level
        restLevelMockMvc
            .perform(delete(ENTITY_API_URL_ID, level.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return levelRepository.count();
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

    protected Level getPersistedLevel(Level level) {
        return levelRepository.findById(level.getId()).orElseThrow();
    }

    protected void assertPersistedLevelToMatchAllProperties(Level expectedLevel) {
        assertLevelAllPropertiesEquals(expectedLevel, getPersistedLevel(expectedLevel));
    }

    protected void assertPersistedLevelToMatchUpdatableProperties(Level expectedLevel) {
        assertLevelAllUpdatablePropertiesEquals(expectedLevel, getPersistedLevel(expectedLevel));
    }
}
