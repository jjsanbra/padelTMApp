package com.padeltmapp.app.service;

import com.padeltmapp.app.domain.RegisterTeam;
import com.padeltmapp.app.repository.RegisterTeamRepository;
import com.padeltmapp.app.service.dto.RegisterTeamDTO;
import com.padeltmapp.app.service.mapper.RegisterTeamMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.padeltmapp.app.domain.RegisterTeam}.
 */
@Service
@Transactional
public class RegisterTeamService {

    private final Logger log = LoggerFactory.getLogger(RegisterTeamService.class);

    private final RegisterTeamRepository registerTeamRepository;

    private final RegisterTeamMapper registerTeamMapper;

    public RegisterTeamService(RegisterTeamRepository registerTeamRepository, RegisterTeamMapper registerTeamMapper) {
        this.registerTeamRepository = registerTeamRepository;
        this.registerTeamMapper = registerTeamMapper;
    }

    /**
     * Save a registerTeam.
     *
     * @param registerTeamDTO the entity to save.
     * @return the persisted entity.
     */
    public RegisterTeamDTO save(RegisterTeamDTO registerTeamDTO) {
        log.debug("Request to save RegisterTeam : {}", registerTeamDTO);
        RegisterTeam registerTeam = registerTeamMapper.toEntity(registerTeamDTO);
        registerTeam = registerTeamRepository.save(registerTeam);
        return registerTeamMapper.toDto(registerTeam);
    }

    /**
     * Update a registerTeam.
     *
     * @param registerTeamDTO the entity to save.
     * @return the persisted entity.
     */
    public RegisterTeamDTO update(RegisterTeamDTO registerTeamDTO) {
        log.debug("Request to update RegisterTeam : {}", registerTeamDTO);
        RegisterTeam registerTeam = registerTeamMapper.toEntity(registerTeamDTO);
        registerTeam = registerTeamRepository.save(registerTeam);
        return registerTeamMapper.toDto(registerTeam);
    }

    /**
     * Partially update a registerTeam.
     *
     * @param registerTeamDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<RegisterTeamDTO> partialUpdate(RegisterTeamDTO registerTeamDTO) {
        log.debug("Request to partially update RegisterTeam : {}", registerTeamDTO);

        return registerTeamRepository
            .findById(registerTeamDTO.getId())
            .map(existingRegisterTeam -> {
                registerTeamMapper.partialUpdate(existingRegisterTeam, registerTeamDTO);

                return existingRegisterTeam;
            })
            .map(registerTeamRepository::save)
            .map(registerTeamMapper::toDto);
    }

    /**
     * Get all the registerTeams.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RegisterTeamDTO> findAll() {
        log.debug("Request to get all RegisterTeams");
        return registerTeamRepository.findAll().stream().map(registerTeamMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one registerTeam by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RegisterTeamDTO> findOne(Long id) {
        log.debug("Request to get RegisterTeam : {}", id);
        return registerTeamRepository.findById(id).map(registerTeamMapper::toDto);
    }

    /**
     * Delete the registerTeam by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete RegisterTeam : {}", id);
        registerTeamRepository.deleteById(id);
    }
}
