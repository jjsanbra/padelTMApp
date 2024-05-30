package com.padeltmapp.app.service;

import com.padeltmapp.app.domain.Level;
import com.padeltmapp.app.repository.LevelRepository;
import com.padeltmapp.app.service.dto.LevelDTO;
import com.padeltmapp.app.service.mapper.LevelMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.padeltmapp.app.domain.Level}.
 */
@Service
@Transactional
public class LevelService {

    private final Logger log = LoggerFactory.getLogger(LevelService.class);

    private final LevelRepository levelRepository;

    private final LevelMapper levelMapper;

    public LevelService(LevelRepository levelRepository, LevelMapper levelMapper) {
        this.levelRepository = levelRepository;
        this.levelMapper = levelMapper;
    }

    /**
     * Save a level.
     *
     * @param levelDTO the entity to save.
     * @return the persisted entity.
     */
    public LevelDTO save(LevelDTO levelDTO) {
        log.debug("Request to save Level : {}", levelDTO);
        Level level = levelMapper.toEntity(levelDTO);
        level = levelRepository.save(level);
        return levelMapper.toDto(level);
    }

    /**
     * Update a level.
     *
     * @param levelDTO the entity to save.
     * @return the persisted entity.
     */
    public LevelDTO update(LevelDTO levelDTO) {
        log.debug("Request to update Level : {}", levelDTO);
        Level level = levelMapper.toEntity(levelDTO);
        level = levelRepository.save(level);
        return levelMapper.toDto(level);
    }

    /**
     * Partially update a level.
     *
     * @param levelDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LevelDTO> partialUpdate(LevelDTO levelDTO) {
        log.debug("Request to partially update Level : {}", levelDTO);

        return levelRepository
            .findById(levelDTO.getId())
            .map(existingLevel -> {
                levelMapper.partialUpdate(existingLevel, levelDTO);

                return existingLevel;
            })
            .map(levelRepository::save)
            .map(levelMapper::toDto);
    }

    /**
     * Get all the levels.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LevelDTO> findAll() {
        log.debug("Request to get all Levels");
        return levelRepository.findAll().stream().map(levelMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one level by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LevelDTO> findOne(Long id) {
        log.debug("Request to get Level : {}", id);
        return levelRepository.findById(id).map(levelMapper::toDto);
    }

    /**
     * Delete the level by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Level : {}", id);
        levelRepository.deleteById(id);
    }
}
