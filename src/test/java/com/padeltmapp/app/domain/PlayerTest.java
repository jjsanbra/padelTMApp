package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.CategoryTestSamples.*;
import static com.padeltmapp.app.domain.PlayerTestSamples.*;
import static com.padeltmapp.app.domain.TeamTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PlayerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Player.class);
        Player player1 = getPlayerSample1();
        Player player2 = new Player();
        assertThat(player1).isNotEqualTo(player2);

        player2.setId(player1.getId());
        assertThat(player1).isEqualTo(player2);

        player2 = getPlayerSample2();
        assertThat(player1).isNotEqualTo(player2);
    }

    @Test
    void categoryTest() throws Exception {
        Player player = getPlayerRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        player.addCategory(categoryBack);
        assertThat(player.getCategories()).containsOnly(categoryBack);

        player.removeCategory(categoryBack);
        assertThat(player.getCategories()).doesNotContain(categoryBack);

        player.categories(new HashSet<>(Set.of(categoryBack)));
        assertThat(player.getCategories()).containsOnly(categoryBack);

        player.setCategories(new HashSet<>());
        assertThat(player.getCategories()).doesNotContain(categoryBack);
    }

    @Test
    void teamsTest() throws Exception {
        Player player = getPlayerRandomSampleGenerator();
        Team teamBack = getTeamRandomSampleGenerator();

        player.addTeams(teamBack);
        assertThat(player.getTeams()).containsOnly(teamBack);
        assertThat(teamBack.getPlayers()).containsOnly(player);

        player.removeTeams(teamBack);
        assertThat(player.getTeams()).doesNotContain(teamBack);
        assertThat(teamBack.getPlayers()).doesNotContain(player);

        player.teams(new HashSet<>(Set.of(teamBack)));
        assertThat(player.getTeams()).containsOnly(teamBack);
        assertThat(teamBack.getPlayers()).containsOnly(player);

        player.setTeams(new HashSet<>());
        assertThat(player.getTeams()).doesNotContain(teamBack);
        assertThat(teamBack.getPlayers()).doesNotContain(player);
    }
}
