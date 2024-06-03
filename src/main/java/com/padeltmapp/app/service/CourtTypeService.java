package com.padeltmapp.app.service;

import com.padeltmapp.app.domain.CourtType;
import com.padeltmapp.app.repository.CourtTypeRepository;
import com.padeltmapp.app.service.dto.CourtTypeDTO;
import com.padeltmapp.app.service.mapper.CourtTypeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.padeltmapp.app.domain.CourtType}.
 */
@Service
@Transactional
public class CourtTypeService {

    private final Logger log = LoggerFactory.getLogger(CourtTypeService.class);

    private final CourtTypeRepository courtTypeRepository;

    private final CourtTypeMapper courtTypeMapper;

    public CourtTypeService(CourtTypeRepository courtTypeRepository, CourtTypeMapper courtTypeMapper) {
        this.courtTypeRepository = courtTypeRepository;
        this.courtTypeMapper = courtTypeMapper;
    }

    /**
     * Save a courtType.
     *
     * @param courtTypeDTO the entity to save.
     * @return the persisted entity.
     */
    public CourtTypeDTO save(CourtTypeDTO courtTypeDTO) {
        log.debug("Request to save CourtType : {}", courtTypeDTO);
        CourtType courtType = courtTypeMapper.toEntity(courtTypeDTO);
        courtType = courtTypeRepository.save(courtType);
        return courtTypeMapper.toDto(courtType);
    }

    /**
     * Update a courtType.
     *
     * @param courtTypeDTO the entity to save.
     * @return the persisted entity.
     */
    public CourtTypeDTO update(CourtTypeDTO courtTypeDTO) {
        log.debug("Request to update CourtType : {}", courtTypeDTO);
        CourtType courtType = courtTypeMapper.toEntity(courtTypeDTO);
        courtType = courtTypeRepository.save(courtType);
        return courtTypeMapper.toDto(courtType);
    }

    /**
     * Partially update a courtType.
     *
     * @param courtTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CourtTypeDTO> partialUpdate(CourtTypeDTO courtTypeDTO) {
        log.debug("Request to partially update CourtType : {}", courtTypeDTO);

        return courtTypeRepository
            .findById(courtTypeDTO.getId())
            .map(existingCourtType -> {
                courtTypeMapper.partialUpdate(existingCourtType, courtTypeDTO);

                return existingCourtType;
            })
            .map(courtTypeRepository::save)
            .map(courtTypeMapper::toDto);
    }

    /**
     * Get all the courtTypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CourtTypeDTO> findAll() {
        log.debug("Request to get all CourtTypes");
        return courtTypeRepository.findAll().stream().map(courtTypeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one courtType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CourtTypeDTO> findOne(Long id) {
        log.debug("Request to get CourtType : {}", id);
        return courtTypeRepository.findById(id).map(courtTypeMapper::toDto);
    }

    /**
     * Delete the courtType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CourtType : {}", id);
        courtTypeRepository.deleteById(id);
    }
}
