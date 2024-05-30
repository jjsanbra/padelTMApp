package com.padeltmapp.app.service.mapper;

import static com.padeltmapp.app.domain.LocationAsserts.*;
import static com.padeltmapp.app.domain.LocationTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LocationMapperTest {

    private LocationMapper locationMapper;

    @BeforeEach
    void setUp() {
        locationMapper = new LocationMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLocationSample1();
        var actual = locationMapper.toEntity(locationMapper.toDto(expected));
        assertLocationAllPropertiesEquals(expected, actual);
    }
}
