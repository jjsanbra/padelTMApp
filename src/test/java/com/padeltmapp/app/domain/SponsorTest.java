package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.SponsorTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SponsorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sponsor.class);
        Sponsor sponsor1 = getSponsorSample1();
        Sponsor sponsor2 = new Sponsor();
        assertThat(sponsor1).isNotEqualTo(sponsor2);

        sponsor2.setId(sponsor1.getId());
        assertThat(sponsor1).isEqualTo(sponsor2);

        sponsor2 = getSponsorSample2();
        assertThat(sponsor1).isNotEqualTo(sponsor2);
    }

    @Test
    void tournamentsTest() {
        Sponsor sponsor = getSponsorRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        sponsor.addTournaments(tournamentBack);
        assertThat(sponsor.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getSponsors()).containsOnly(sponsor);

        sponsor.removeTournaments(tournamentBack);
        assertThat(sponsor.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getSponsors()).doesNotContain(sponsor);

        sponsor.tournaments(new HashSet<>(Set.of(tournamentBack)));
        assertThat(sponsor.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getSponsors()).containsOnly(sponsor);

        sponsor.setTournaments(new HashSet<>());
        assertThat(sponsor.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getSponsors()).doesNotContain(sponsor);
    }
}
