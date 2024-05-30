package com.padeltmapp.app.web.rest;

import com.padeltmapp.app.repository.LevelRepository;
import com.padeltmapp.app.service.LevelService;
import com.padeltmapp.app.service.dto.LevelDTO;
import com.padeltmapp.app.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.padeltmapp.app.domain.Level}.
 */
@RestController
@RequestMapping("/api/levels")
public class LevelResource {

    private final Logger log = LoggerFactory.getLogger(LevelResource.class);

    private static final String ENTITY_NAME = "level";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LevelService levelService;

    private final LevelRepository levelRepository;

    public LevelResource(LevelService levelService, LevelRepository levelRepository) {
        this.levelService = levelService;
        this.levelRepository = levelRepository;
    }

    /**
     * {@code POST  /levels} : Create a new level.
     *
     * @param levelDTO the levelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new levelDTO, or with status {@code 400 (Bad Request)} if the level has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LevelDTO> createLevel(@Valid @RequestBody LevelDTO levelDTO) throws URISyntaxException {
        log.debug("REST request to save Level : {}", levelDTO);
        if (levelDTO.getId() != null) {
            throw new BadRequestAlertException("A new level cannot already have an ID", ENTITY_NAME, "idexists");
        }
        levelDTO = levelService.save(levelDTO);
        return ResponseEntity.created(new URI("/api/levels/" + levelDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, levelDTO.getId().toString()))
            .body(levelDTO);
    }

    /**
     * {@code PUT  /levels/:id} : Updates an existing level.
     *
     * @param id the id of the levelDTO to save.
     * @param levelDTO the levelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated levelDTO,
     * or with status {@code 400 (Bad Request)} if the levelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the levelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LevelDTO> updateLevel(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LevelDTO levelDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Level : {}, {}", id, levelDTO);
        if (levelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, levelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!levelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        levelDTO = levelService.update(levelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, levelDTO.getId().toString()))
            .body(levelDTO);
    }

    /**
     * {@code PATCH  /levels/:id} : Partial updates given fields of an existing level, field will ignore if it is null
     *
     * @param id the id of the levelDTO to save.
     * @param levelDTO the levelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated levelDTO,
     * or with status {@code 400 (Bad Request)} if the levelDTO is not valid,
     * or with status {@code 404 (Not Found)} if the levelDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the levelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LevelDTO> partialUpdateLevel(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LevelDTO levelDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Level partially : {}, {}", id, levelDTO);
        if (levelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, levelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!levelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LevelDTO> result = levelService.partialUpdate(levelDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, levelDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /levels} : get all the levels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of levels in body.
     */
    @GetMapping("")
    public List<LevelDTO> getAllLevels() {
        log.debug("REST request to get all Levels");
        return levelService.findAll();
    }

    /**
     * {@code GET  /levels/:id} : get the "id" level.
     *
     * @param id the id of the levelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the levelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LevelDTO> getLevel(@PathVariable("id") Long id) {
        log.debug("REST request to get Level : {}", id);
        Optional<LevelDTO> levelDTO = levelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levelDTO);
    }

    /**
     * {@code DELETE  /levels/:id} : delete the "id" level.
     *
     * @param id the id of the levelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLevel(@PathVariable("id") Long id) {
        log.debug("REST request to delete Level : {}", id);
        levelService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
