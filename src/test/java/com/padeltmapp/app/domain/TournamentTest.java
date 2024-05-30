package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CategoryTestSamples.*;
import static com.padeltmapp.app.domain.LevelTestSamples.*;
import static com.padeltmapp.app.domain.LocationTestSamples.*;
import static com.padeltmapp.app.domain.SponsorTestSamples.*;
import static com.padeltmapp.app.domain.TeamTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TournamentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tournament.class);
        Tournament tournament1 = getTournamentSample1();
        Tournament tournament2 = new Tournament();
        assertThat(tournament1).isNotEqualTo(tournament2);

        tournament2.setId(tournament1.getId());
        assertThat(tournament1).isEqualTo(tournament2);

        tournament2 = getTournamentSample2();
        assertThat(tournament1).isNotEqualTo(tournament2);
    }

    @Test
    void locationTest() throws Exception {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Location locationBack = getLocationRandomSampleGenerator();

        tournament.setLocation(locationBack);
        assertThat(tournament.getLocation()).isEqualTo(locationBack);

        tournament.location(null);
        assertThat(tournament.getLocation()).isNull();
    }

    @Test
    void sponsorTest() throws Exception {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Sponsor sponsorBack = getSponsorRandomSampleGenerator();

        tournament.addSponsor(sponsorBack);
        assertThat(tournament.getSponsors()).containsOnly(sponsorBack);

        tournament.removeSponsor(sponsorBack);
        assertThat(tournament.getSponsors()).doesNotContain(sponsorBack);

        tournament.sponsors(new HashSet<>(Set.of(sponsorBack)));
        assertThat(tournament.getSponsors()).containsOnly(sponsorBack);

        tournament.setSponsors(new HashSet<>());
        assertThat(tournament.getSponsors()).doesNotContain(sponsorBack);
    }

    @Test
    void teamTest() throws Exception {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Team teamBack = getTeamRandomSampleGenerator();

        tournament.addTeam(teamBack);
        assertThat(tournament.getTeams()).containsOnly(teamBack);

        tournament.removeTeam(teamBack);
        assertThat(tournament.getTeams()).doesNotContain(teamBack);

        tournament.teams(new HashSet<>(Set.of(teamBack)));
        assertThat(tournament.getTeams()).containsOnly(teamBack);

        tournament.setTeams(new HashSet<>());
        assertThat(tournament.getTeams()).doesNotContain(teamBack);
    }

    @Test
    void categoryTest() throws Exception {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        tournament.addCategory(categoryBack);
        assertThat(tournament.getCategories()).containsOnly(categoryBack);

        tournament.removeCategory(categoryBack);
        assertThat(tournament.getCategories()).doesNotContain(categoryBack);

        tournament.categories(new HashSet<>(Set.of(categoryBack)));
        assertThat(tournament.getCategories()).containsOnly(categoryBack);

        tournament.setCategories(new HashSet<>());
        assertThat(tournament.getCategories()).doesNotContain(categoryBack);
    }

    @Test
    void levelTest() throws Exception {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Level levelBack = getLevelRandomSampleGenerator();

        tournament.addLevel(levelBack);
        assertThat(tournament.getLevels()).containsOnly(levelBack);

        tournament.removeLevel(levelBack);
        assertThat(tournament.getLevels()).doesNotContain(levelBack);

        tournament.levels(new HashSet<>(Set.of(levelBack)));
        assertThat(tournament.getLevels()).containsOnly(levelBack);

        tournament.setLevels(new HashSet<>());
        assertThat(tournament.getLevels()).doesNotContain(levelBack);
    }
}
