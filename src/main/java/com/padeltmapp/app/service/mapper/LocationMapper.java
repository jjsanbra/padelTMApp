package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Country;
import com.padeltmapp.app.domain.Location;
import com.padeltmapp.app.service.dto.CountryDTO;
import com.padeltmapp.app.service.dto.LocationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Location} and its DTO {@link LocationDTO}.
 */
@Mapper(componentModel = "spring")
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {
    @Mapping(target = "country", source = "country", qualifiedByName = "countryCountryName")
    LocationDTO toDto(Location s);

    @Named("countryCountryName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "countryName", source = "countryName")
    CountryDTO toDtoCountryCountryName(Country country);
}
