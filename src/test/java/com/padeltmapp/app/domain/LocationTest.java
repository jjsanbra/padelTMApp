package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CountryTestSamples.*;
import static com.padeltmapp.app.domain.LocationTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LocationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Location.class);
        Location location1 = getLocationSample1();
        Location location2 = new Location();
        assertThat(location1).isNotEqualTo(location2);

        location2.setId(location1.getId());
        assertThat(location1).isEqualTo(location2);

        location2 = getLocationSample2();
        assertThat(location1).isNotEqualTo(location2);
    }

    @Test
    void countryTest() throws Exception {
        Location location = getLocationRandomSampleGenerator();
        Country countryBack = getCountryRandomSampleGenerator();

        location.setCountry(countryBack);
        assertThat(location.getCountry()).isEqualTo(countryBack);

        location.country(null);
        assertThat(location.getCountry()).isNull();
    }

    @Test
    void tournamentTest() throws Exception {
        Location location = getLocationRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        location.setTournament(tournamentBack);
        assertThat(location.getTournament()).isEqualTo(tournamentBack);
        assertThat(tournamentBack.getLocation()).isEqualTo(location);

        location.tournament(null);
        assertThat(location.getTournament()).isNull();
        assertThat(tournamentBack.getLocation()).isNull();
    }
}
