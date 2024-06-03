package com.padeltmapp.app.service.mapper;

import static com.padeltmapp.app.domain.CourtTypeAsserts.*;
import static com.padeltmapp.app.domain.CourtTypeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourtTypeMapperTest {

    private CourtTypeMapper courtTypeMapper;

    @BeforeEach
    void setUp() {
        courtTypeMapper = new CourtTypeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourtTypeSample1();
        var actual = courtTypeMapper.toEntity(courtTypeMapper.toDto(expected));
        assertCourtTypeAllPropertiesEquals(expected, actual);
    }
}
