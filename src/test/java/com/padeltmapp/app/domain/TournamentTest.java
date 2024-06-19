package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CategoryTestSamples.*;
import static com.padeltmapp.app.domain.CourtTypeTestSamples.*;
import static com.padeltmapp.app.domain.LevelTestSamples.*;
import static com.padeltmapp.app.domain.LocationTestSamples.*;
import static com.padeltmapp.app.domain.RegisterTeamTestSamples.*;
import static com.padeltmapp.app.domain.SponsorTestSamples.*;
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
    void sponsorsTest() {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Sponsor sponsorBack = getSponsorRandomSampleGenerator();

        tournament.addSponsors(sponsorBack);
        assertThat(tournament.getSponsors()).containsOnly(sponsorBack);

        tournament.removeSponsors(sponsorBack);
        assertThat(tournament.getSponsors()).doesNotContain(sponsorBack);

        tournament.sponsors(new HashSet<>(Set.of(sponsorBack)));
        assertThat(tournament.getSponsors()).containsOnly(sponsorBack);

        tournament.setSponsors(new HashSet<>());
        assertThat(tournament.getSponsors()).doesNotContain(sponsorBack);
    }

    @Test
    void categoriesTest() {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        tournament.addCategories(categoryBack);
        assertThat(tournament.getCategories()).containsOnly(categoryBack);

        tournament.removeCategories(categoryBack);
        assertThat(tournament.getCategories()).doesNotContain(categoryBack);

        tournament.categories(new HashSet<>(Set.of(categoryBack)));
        assertThat(tournament.getCategories()).containsOnly(categoryBack);

        tournament.setCategories(new HashSet<>());
        assertThat(tournament.getCategories()).doesNotContain(categoryBack);
    }

    @Test
    void levelsTest() {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Level levelBack = getLevelRandomSampleGenerator();

        tournament.addLevels(levelBack);
        assertThat(tournament.getLevels()).containsOnly(levelBack);

        tournament.removeLevels(levelBack);
        assertThat(tournament.getLevels()).doesNotContain(levelBack);

        tournament.levels(new HashSet<>(Set.of(levelBack)));
        assertThat(tournament.getLevels()).containsOnly(levelBack);

        tournament.setLevels(new HashSet<>());
        assertThat(tournament.getLevels()).doesNotContain(levelBack);
    }

    @Test
    void courtTypesTest() {
        Tournament tournament = getTournamentRandomSampleGenerator();
        CourtType courtTypeBack = getCourtTypeRandomSampleGenerator();

        tournament.addCourtTypes(courtTypeBack);
        assertThat(tournament.getCourtTypes()).containsOnly(courtTypeBack);

        tournament.removeCourtTypes(courtTypeBack);
        assertThat(tournament.getCourtTypes()).doesNotContain(courtTypeBack);

        tournament.courtTypes(new HashSet<>(Set.of(courtTypeBack)));
        assertThat(tournament.getCourtTypes()).containsOnly(courtTypeBack);

        tournament.setCourtTypes(new HashSet<>());
        assertThat(tournament.getCourtTypes()).doesNotContain(courtTypeBack);
    }

    @Test
    void locationTest() {
        Tournament tournament = getTournamentRandomSampleGenerator();
        Location locationBack = getLocationRandomSampleGenerator();

        tournament.setLocation(locationBack);
        assertThat(tournament.getLocation()).isEqualTo(locationBack);

        tournament.location(null);
        assertThat(tournament.getLocation()).isNull();
    }

    @Test
    void registerTeamTest() {
        Tournament tournament = getTournamentRandomSampleGenerator();
        RegisterTeam registerTeamBack = getRegisterTeamRandomSampleGenerator();

        tournament.addRegisterTeam(registerTeamBack);
        assertThat(tournament.getRegisterTeams()).containsOnly(registerTeamBack);
        assertThat(registerTeamBack.getTournaments()).containsOnly(tournament);

        tournament.removeRegisterTeam(registerTeamBack);
        assertThat(tournament.getRegisterTeams()).doesNotContain(registerTeamBack);
        assertThat(registerTeamBack.getTournaments()).doesNotContain(tournament);

        tournament.registerTeams(new HashSet<>(Set.of(registerTeamBack)));
        assertThat(tournament.getRegisterTeams()).containsOnly(registerTeamBack);
        assertThat(registerTeamBack.getTournaments()).containsOnly(tournament);

        tournament.setRegisterTeams(new HashSet<>());
        assertThat(tournament.getRegisterTeams()).doesNotContain(registerTeamBack);
        assertThat(registerTeamBack.getTournaments()).doesNotContain(tournament);
    }
}
