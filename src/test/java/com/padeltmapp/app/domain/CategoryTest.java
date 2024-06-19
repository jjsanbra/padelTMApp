package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CategoryTestSamples.*;
import static com.padeltmapp.app.domain.TournamentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Category.class);
        Category category1 = getCategorySample1();
        Category category2 = new Category();
        assertThat(category1).isNotEqualTo(category2);

        category2.setId(category1.getId());
        assertThat(category1).isEqualTo(category2);

        category2 = getCategorySample2();
        assertThat(category1).isNotEqualTo(category2);
    }

    @Test
    void tournamentsTest() {
        Category category = getCategoryRandomSampleGenerator();
        Tournament tournamentBack = getTournamentRandomSampleGenerator();

        category.addTournaments(tournamentBack);
        assertThat(category.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getCategories()).containsOnly(category);

        category.removeTournaments(tournamentBack);
        assertThat(category.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getCategories()).doesNotContain(category);

        category.tournaments(new HashSet<>(Set.of(tournamentBack)));
        assertThat(category.getTournaments()).containsOnly(tournamentBack);
        assertThat(tournamentBack.getCategories()).containsOnly(category);

        category.setTournaments(new HashSet<>());
        assertThat(category.getTournaments()).doesNotContain(tournamentBack);
        assertThat(tournamentBack.getCategories()).doesNotContain(category);
    }
}
