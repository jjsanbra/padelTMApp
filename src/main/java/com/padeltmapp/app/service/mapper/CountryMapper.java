package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Country;
import com.padeltmapp.app.service.dto.CountryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Country} and its DTO {@link CountryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CountryMapper extends EntityMapper<CountryDTO, Country> {}
