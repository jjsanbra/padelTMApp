package com.padeltmapp.app.service.mapper;

import static com.padeltmapp.app.domain.SponsorAsserts.*;
import static com.padeltmapp.app.domain.SponsorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SponsorMapperTest {

    private SponsorMapper sponsorMapper;

    @BeforeEach
    void setUp() {
        sponsorMapper = new SponsorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getSponsorSample1();
        var actual = sponsorMapper.toEntity(sponsorMapper.toDto(expected));
        assertSponsorAllPropertiesEquals(expected, actual);
    }
}
