package com.padeltmapp.app.service.mapper;

import static com.padeltmapp.app.domain.LevelAsserts.*;
import static com.padeltmapp.app.domain.LevelTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LevelMapperTest {

    private LevelMapper levelMapper;

    @BeforeEach
    void setUp() {
        levelMapper = new LevelMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLevelSample1();
        var actual = levelMapper.toEntity(levelMapper.toDto(expected));
        assertLevelAllPropertiesEquals(expected, actual);
    }
}
