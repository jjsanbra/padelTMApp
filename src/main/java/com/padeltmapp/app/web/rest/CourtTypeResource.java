package com.padeltmapp.app.web.rest;

import com.padeltmapp.app.repository.CourtTypeRepository;
import com.padeltmapp.app.service.CourtTypeService;
import com.padeltmapp.app.service.dto.CourtTypeDTO;
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
 * REST controller for managing {@link com.padeltmapp.app.domain.CourtType}.
 */
@RestController
@RequestMapping("/api/court-types")
public class CourtTypeResource {

    private final Logger log = LoggerFactory.getLogger(CourtTypeResource.class);

    private static final String ENTITY_NAME = "courtType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourtTypeService courtTypeService;

    private final CourtTypeRepository courtTypeRepository;

    public CourtTypeResource(CourtTypeService courtTypeService, CourtTypeRepository courtTypeRepository) {
        this.courtTypeService = courtTypeService;
        this.courtTypeRepository = courtTypeRepository;
    }

    /**
     * {@code POST  /court-types} : Create a new courtType.
     *
     * @param courtTypeDTO the courtTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courtTypeDTO, or with status {@code 400 (Bad Request)} if the courtType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CourtTypeDTO> createCourtType(@Valid @RequestBody CourtTypeDTO courtTypeDTO) throws URISyntaxException {
        log.debug("REST request to save CourtType : {}", courtTypeDTO);
        if (courtTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new courtType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        courtTypeDTO = courtTypeService.save(courtTypeDTO);
        return ResponseEntity.created(new URI("/api/court-types/" + courtTypeDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, courtTypeDTO.getId().toString()))
            .body(courtTypeDTO);
    }

    /**
     * {@code PUT  /court-types/:id} : Updates an existing courtType.
     *
     * @param id the id of the courtTypeDTO to save.
     * @param courtTypeDTO the courtTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courtTypeDTO,
     * or with status {@code 400 (Bad Request)} if the courtTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courtTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourtTypeDTO> updateCourtType(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CourtTypeDTO courtTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CourtType : {}, {}", id, courtTypeDTO);
        if (courtTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courtTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courtTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        courtTypeDTO = courtTypeService.update(courtTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courtTypeDTO.getId().toString()))
            .body(courtTypeDTO);
    }

    /**
     * {@code PATCH  /court-types/:id} : Partial updates given fields of an existing courtType, field will ignore if it is null
     *
     * @param id the id of the courtTypeDTO to save.
     * @param courtTypeDTO the courtTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courtTypeDTO,
     * or with status {@code 400 (Bad Request)} if the courtTypeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the courtTypeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the courtTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CourtTypeDTO> partialUpdateCourtType(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CourtTypeDTO courtTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CourtType partially : {}, {}", id, courtTypeDTO);
        if (courtTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courtTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courtTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CourtTypeDTO> result = courtTypeService.partialUpdate(courtTypeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courtTypeDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /court-types} : get all the courtTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courtTypes in body.
     */
    @GetMapping("")
    public List<CourtTypeDTO> getAllCourtTypes() {
        log.debug("REST request to get all CourtTypes");
        return courtTypeService.findAll();
    }

    /**
     * {@code GET  /court-types/:id} : get the "id" courtType.
     *
     * @param id the id of the courtTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courtTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CourtTypeDTO> getCourtType(@PathVariable("id") Long id) {
        log.debug("REST request to get CourtType : {}", id);
        Optional<CourtTypeDTO> courtTypeDTO = courtTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(courtTypeDTO);
    }

    /**
     * {@code DELETE  /court-types/:id} : delete the "id" courtType.
     *
     * @param id the id of the courtTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourtType(@PathVariable("id") Long id) {
        log.debug("REST request to delete CourtType : {}", id);
        courtTypeService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
