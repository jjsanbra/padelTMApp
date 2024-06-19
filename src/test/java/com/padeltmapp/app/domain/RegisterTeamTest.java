package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.RegisterTeamTestSamples.*;
import static com.padeltmapp.app.domain.TeamTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class RegisterTeamTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegisterTeam.class);
        RegisterTeam registerTeam1 = getRegisterTeamSample1();
        RegisterTeam registerTeam2 = new RegisterTeam();
        assertThat(registerTeam1).isNotEqualTo(registerTeam2);

        registerTeam2.setId(registerTeam1.getId());
        assertThat(registerTeam1).isEqualTo(registerTeam2);

        registerTeam2 = getRegisterTeamSample2();
        assertThat(registerTeam1).isNotEqualTo(registerTeam2);
    }

    @Test
    void teamTest() {
        RegisterTeam registerTeam = getRegisterTeamRandomSampleGenerator();
        Team teamBack = getTeamRandomSampleGenerator();

        registerTeam.setTeam(teamBack);
        assertThat(registerTeam.getTeam()).isEqualTo(teamBack);

        registerTeam.team(null);
        assertThat(registerTeam.getTeam()).isNull();
    }

    @Test
    void tournamentsTest() {
        RegisterTeam registerTeam = getRegisterTeamRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        registerTeam.addTournaments(tournamentBack);
        assertThat(registerTeam.getTournaments()).containsOnly(tournamentBack);

        registerTeam.removeTournaments(tournamentBack);
        assertThat(registerTeam.getTournaments()).doesNotContain(tournamentBack);

        registerTeam.tournaments(new HashSet<>(Set.of(tournamentBack)));
        assertThat(registerTeam.getTournaments()).containsOnly(tournamentBack);

        registerTeam.setTournaments(new HashSet<>());
        assertThat(registerTeam.getTournaments()).doesNotContain(tournamentBack);
    }
}
