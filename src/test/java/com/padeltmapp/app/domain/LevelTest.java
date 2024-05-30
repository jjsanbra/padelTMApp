package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.LevelTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LevelTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Level.class);
        Level level1 = getLevelSample1();
        Level level2 = new Level();
        assertThat(level1).isNotEqualTo(level2);

        level2.setId(level1.getId());
        assertThat(level1).isEqualTo(level2);

        level2 = getLevelSample2();
        assertThat(level1).isNotEqualTo(level2);
    }

    @Test
    void tournamentsTest() throws Exception {
        Level level = getLevelRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        level.addTournaments(tournamentBack);
        assertThat(level.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getLevels()).containsOnly(level);

        level.removeTournaments(tournamentBack);
        assertThat(level.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getLevels()).doesNotContain(level);

        level.tournaments(new HashSet<>(Set.of(tournamentBack)));
        assertThat(level.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getLevels()).containsOnly(level);

        level.setTournaments(new HashSet<>());
        assertThat(level.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getLevels()).doesNotContain(level);
    }
}
