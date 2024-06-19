package com.padeltmapp.app.web.rest;

import com.padeltmapp.app.repository.RegisterTeamRepository;
import com.padeltmapp.app.service.RegisterTeamService;
import com.padeltmapp.app.service.dto.RegisterTeamDTO;
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
 * REST controller for managing {@link com.padeltmapp.app.domain.RegisterTeam}.
 */
@RestController
@RequestMapping("/api/register-teams")
public class RegisterTeamResource {

    private final Logger log = LoggerFactory.getLogger(RegisterTeamResource.class);

    private static final String ENTITY_NAME = "registerTeam";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RegisterTeamService registerTeamService;

    private final RegisterTeamRepository registerTeamRepository;

    public RegisterTeamResource(RegisterTeamService registerTeamService, RegisterTeamRepository registerTeamRepository) {
        this.registerTeamService = registerTeamService;
        this.registerTeamRepository = registerTeamRepository;
    }

    /**
     * {@code POST  /register-teams} : Create a new registerTeam.
     *
     * @param registerTeamDTO the registerTeamDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new registerTeamDTO, or with status {@code 400 (Bad Request)} if the registerTeam has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<RegisterTeamDTO> createRegisterTeam(@Valid @RequestBody RegisterTeamDTO registerTeamDTO)
        throws URISyntaxException {
        log.debug("REST request to save RegisterTeam : {}", registerTeamDTO);
        if (registerTeamDTO.getId() != null) {
            throw new BadRequestAlertException("A new registerTeam cannot already have an ID", ENTITY_NAME, "idexists");
        }
        registerTeamDTO = registerTeamService.save(registerTeamDTO);
        return ResponseEntity.created(new URI("/api/register-teams/" + registerTeamDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, registerTeamDTO.getId().toString()))
            .body(registerTeamDTO);
    }

    /**
     * {@code PUT  /register-teams/:id} : Updates an existing registerTeam.
     *
     * @param id the id of the registerTeamDTO to save.
     * @param registerTeamDTO the registerTeamDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated registerTeamDTO,
     * or with status {@code 400 (Bad Request)} if the registerTeamDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the registerTeamDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<RegisterTeamDTO> updateRegisterTeam(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RegisterTeamDTO registerTeamDTO
    ) throws URISyntaxException {
        log.debug("REST request to update RegisterTeam : {}, {}", id, registerTeamDTO);
        if (registerTeamDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, registerTeamDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!registerTeamRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        registerTeamDTO = registerTeamService.update(registerTeamDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, registerTeamDTO.getId().toString()))
            .body(registerTeamDTO);
    }

    /**
     * {@code PATCH  /register-teams/:id} : Partial updates given fields of an existing registerTeam, field will ignore if it is null
     *
     * @param id the id of the registerTeamDTO to save.
     * @param registerTeamDTO the registerTeamDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated registerTeamDTO,
     * or with status {@code 400 (Bad Request)} if the registerTeamDTO is not valid,
     * or with status {@code 404 (Not Found)} if the registerTeamDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the registerTeamDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RegisterTeamDTO> partialUpdateRegisterTeam(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RegisterTeamDTO registerTeamDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update RegisterTeam partially : {}, {}", id, registerTeamDTO);
        if (registerTeamDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, registerTeamDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!registerTeamRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RegisterTeamDTO> result = registerTeamService.partialUpdate(registerTeamDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, registerTeamDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /register-teams} : get all the registerTeams.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of registerTeams in body.
     */
    @GetMapping("")
    public List<RegisterTeamDTO> getAllRegisterTeams(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get all RegisterTeams");
        return registerTeamService.findAll();
    }

    /**
     * {@code GET  /register-teams/:id} : get the "id" registerTeam.
     *
     * @param id the id of the registerTeamDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the registerTeamDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RegisterTeamDTO> getRegisterTeam(@PathVariable("id") Long id) {
        log.debug("REST request to get RegisterTeam : {}", id);
        Optional<RegisterTeamDTO> registerTeamDTO = registerTeamService.findOne(id);
        return ResponseUtil.wrapOrNotFound(registerTeamDTO);
    }

    /**
     * {@code DELETE  /register-teams/:id} : delete the "id" registerTeam.
     *
     * @param id the id of the registerTeamDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegisterTeam(@PathVariable("id") Long id) {
        log.debug("REST request to delete RegisterTeam : {}", id);
        registerTeamService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
