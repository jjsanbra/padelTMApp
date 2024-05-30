package com.padeltmapp.app.service.mapper;

import static com.padeltmapp.app.domain.TournamentAsserts.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TournamentMapperTest {

    private TournamentMapper tournamentMapper;

    @BeforeEach
    void setUp() {
        tournamentMapper = new TournamentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTournamentSample1();
        var actual = tournamentMapper.toEntity(tournamentMapper.toDto(expected));
        assertTournamentAllPropertiesEquals(expected, actual);
    }
}
