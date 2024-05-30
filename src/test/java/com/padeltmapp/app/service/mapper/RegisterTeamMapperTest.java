package com.padeltmapp.app.service.mapper;

import static com.padeltmapp.app.domain.RegisterTeamAsserts.*;
import static com.padeltmapp.app.domain.RegisterTeamTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RegisterTeamMapperTest {

    private RegisterTeamMapper registerTeamMapper;

    @BeforeEach
    void setUp() {
        registerTeamMapper = new RegisterTeamMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getRegisterTeamSample1();
        var actual = registerTeamMapper.toEntity(registerTeamMapper.toDto(expected));
        assertRegisterTeamAllPropertiesEquals(expected, actual);
    }
}
