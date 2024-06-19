package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CourtTypeTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CourtTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourtType.class);
        CourtType courtType1 = getCourtTypeSample1();
        CourtType courtType2 = new CourtType();
        assertThat(courtType1).isNotEqualTo(courtType2);

        courtType2.setId(courtType1.getId());
        assertThat(courtType1).isEqualTo(courtType2);

        courtType2 = getCourtTypeSample2();
        assertThat(courtType1).isNotEqualTo(courtType2);
    }

    @Test
    void tournamentsTest() {
        CourtType courtType = getCourtTypeRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        courtType.addTournaments(tournamentBack);
        assertThat(courtType.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getCourtTypes()).containsOnly(courtType);

        courtType.removeTournaments(tournamentBack);
        assertThat(courtType.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getCourtTypes()).doesNotContain(courtType);

        courtType.tournaments(new HashSet<>(Set.of(tournamentBack)));
        assertThat(courtType.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getCourtTypes()).containsOnly(courtType);

        courtType.setTournaments(new HashSet<>());
        assertThat(courtType.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getCourtTypes()).doesNotContain(courtType);
    }
}
