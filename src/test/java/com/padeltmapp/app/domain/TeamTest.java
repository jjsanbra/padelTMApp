package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CategoryTestSamples.*;
import static com.padeltmapp.app.domain.LevelTestSamples.*;
import static com.padeltmapp.app.domain.PlayerTestSamples.*;
import static com.padeltmapp.app.domain.RegisterTeamTestSamples.*;
import static com.padeltmapp.app.domain.TeamTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TeamTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Team.class);
        Team team1 = getTeamSample1();
        Team team2 = new Team();
        assertThat(team1).isNotEqualTo(team2);

        team2.setId(team1.getId());
        assertThat(team1).isEqualTo(team2);

        team2 = getTeamSample2();
        assertThat(team1).isNotEqualTo(team2);
    }

    @Test
    void levelTest() {
        Team team = getTeamRandomSampleGenerator();
        Level levelBack = getLevelRandomSampleGenerator();

        team.setLevel(levelBack);
        assertThat(team.getLevel()).isEqualTo(levelBack);

        team.level(null);
        assertThat(team.getLevel()).isNull();
    }

    @Test
    void categoryTest() {
        Team team = getTeamRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        team.setCategory(categoryBack);
        assertThat(team.getCategory()).isEqualTo(categoryBack);

        team.category(null);
        assertThat(team.getCategory()).isNull();
    }

    @Test
    void playersTest() {
        Team team = getTeamRandomSampleGenerator();
        Player playerBack = getPlayerRandomSampleGenerator();

        team.addPlayers(playerBack);
        assertThat(team.getPlayers()).containsOnly(playerBack);

        team.removePlayers(playerBack);
        assertThat(team.getPlayers()).doesNotContain(playerBack);

        team.players(new HashSet<>(Set.of(playerBack)));
        assertThat(team.getPlayers()).containsOnly(playerBack);

        team.setPlayers(new HashSet<>());
        assertThat(team.getPlayers()).doesNotContain(playerBack);
    }

    @Test
    void registerTeamTest() {
        Team team = getTeamRandomSampleGenerator();
        RegisterTeam registerTeamBack = getRegisterTeamRandomSampleGenerator();

        team.addRegisterTeam(registerTeamBack);
        assertThat(team.getRegisterTeams()).containsOnly(registerTeamBack);
        assertThat(registerTeamBack.getTeam()).isEqualTo(team);

        team.removeRegisterTeam(registerTeamBack);
        assertThat(team.getRegisterTeams()).doesNotContain(registerTeamBack);
        assertThat(registerTeamBack.getTeam()).isNull();

        team.registerTeams(new HashSet<>(Set.of(registerTeamBack)));
        assertThat(team.getRegisterTeams()).containsOnly(registerTeamBack);
        assertThat(registerTeamBack.getTeam()).isEqualTo(team);

        team.setRegisterTeams(new HashSet<>());
        assertThat(team.getRegisterTeams()).doesNotContain(registerTeamBack);
        assertThat(registerTeamBack.getTeam()).isNull();
    }
}
