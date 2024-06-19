package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CountryTestSamples.*;
import static com.padeltmapp.app.domain.LocationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CountryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Country.class);
        Country country1 = getCountrySample1();
        Country country2 = new Country();
        assertThat(country1).isNotEqualTo(country2);

        country2.setId(country1.getId());
        assertThat(country1).isEqualTo(country2);

        country2 = getCountrySample2();
        assertThat(country1).isNotEqualTo(country2);
    }

    @Test
    void locationTest() {
        Country country = getCountryRandomSampleGenerator();
        Location locationBack = getLocationRandomSampleGenerator();

        country.addLocation(locationBack);
        assertThat(country.getLocations()).containsOnly(locationBack);
        assertThat(locationBack.getCountry()).isEqualTo(country);

        country.removeLocation(locationBack);
        assertThat(country.getLocations()).doesNotContain(locationBack);
        assertThat(locationBack.getCountry()).isNull();

        country.locations(new HashSet<>(Set.of(locationBack)));
        assertThat(country.getLocations()).containsOnly(locationBack);
        assertThat(locationBack.getCountry()).isEqualTo(country);

        country.setLocations(new HashSet<>());
        assertThat(country.getLocations()).doesNotContain(locationBack);
        assertThat(locationBack.getCountry()).isNull();
    }
}
