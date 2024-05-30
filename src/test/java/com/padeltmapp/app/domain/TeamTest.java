package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.PlayerTestSamples.*;
import static com.padeltmapp.app.domain.TeamTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
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
    void playerTest() throws Exception {
        Team team = getTeamRandomSampleGenerator();
        Player playerBack = getPlayerRandomSampleGenerator();

        team.addPlayer(playerBack);
        assertThat(team.getPlayers()).containsOnly(playerBack);

        team.removePlayer(playerBack);
        assertThat(team.getPlayers()).doesNotContain(playerBack);

        team.players(new HashSet<>(Set.of(playerBack)));
        assertThat(team.getPlayers()).containsOnly(playerBack);

        team.setPlayers(new HashSet<>());
        assertThat(team.getPlayers()).doesNotContain(playerBack);
    }

    @Test
    void tournamentsTest() throws Exception {
        Team team = getTeamRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        team.addTournaments(tournamentBack);
        assertThat(team.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getTeams()).containsOnly(team);

        team.removeTournaments(tournamentBack);
        assertThat(team.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getTeams()).doesNotContain(team);

        team.tournaments(new HashSet<>(Set.of(tournamentBack)));
        assertThat(team.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getTeams()).containsOnly(team);

        team.setTournaments(new HashSet<>());
        assertThat(team.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getTeams()).doesNotContain(team);
    }
}
