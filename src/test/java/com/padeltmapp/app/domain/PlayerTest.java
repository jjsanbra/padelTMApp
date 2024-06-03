package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.LevelTestSamples.*;
import static com.padeltmapp.app.domain.PlayerTestSamples.*;
import static com.padeltmapp.app.domain.TeamTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PlayerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Player.class);
        Player player1 = getPlayerSample1();
        Player player2 = new Player();
        assertThat(player1).isNotEqualTo(player2);

        player2.setId(player1.getId());
        assertThat(player1).isEqualTo(player2);

        player2 = getPlayerSample2();
        assertThat(player1).isNotEqualTo(player2);
    }

    @Test
    void levelTest() throws Exception {
        Player player = getPlayerRandomSampleGenerator();
        Level levelBack = getLevelRandomSampleGenerator();

        player.setLevel(levelBack);
        assertThat(player.getLevel()).isEqualTo(levelBack);

        player.level(null);
        assertThat(player.getLevel()).isNull();
    }

    @Test
    void teamsTest() throws Exception {
        Player player = getPlayerRandomSampleGenerator();
        Team teamBack = getTeamRandomSampleGenerator();

        player.addTeams(teamBack);
        assertThat(player.getTeams()).containsOnly(teamBack);
        assertThat(teamBack.getPlayers()).containsOnly(player);

        player.removeTeams(teamBack);
        assertThat(player.getTeams()).doesNotContain(teamBack);
        assertThat(teamBack.getPlayers()).doesNotContain(player);

        player.teams(new HashSet<>(Set.of(teamBack)));
        assertThat(player.getTeams()).containsOnly(teamBack);
        assertThat(teamBack.getPlayers()).containsOnly(player);

        player.setTeams(new HashSet<>());
        assertThat(player.getTeams()).doesNotContain(teamBack);
        assertThat(teamBack.getPlayers()).doesNotContain(player);
    }
}
