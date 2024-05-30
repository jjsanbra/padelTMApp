package com.padeltmapp.app.service.dto;

import com.padeltmapp.app.domain.enumeration.CategoryEnum;
import com.padeltmapp.app.domain.enumeration.LevelEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.Team} entity.
 */
@Schema(description = "The Team entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TeamDTO implements Serializable {

    private Long id;

    private String teamName;

    private LevelEnum level;

    private CategoryEnum category;

    @NotNull
    private Set<PlayerDTO> players = new HashSet<>();

    private Set<TournamentDTO> tournaments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public LevelEnum getLevel() {
        return level;
    }

    public void setLevel(LevelEnum level) {
        this.level = level;
    }

    public CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

    public Set<PlayerDTO> getPlayers() {
        return players;
    }

    public void setPlayers(Set<PlayerDTO> players) {
        this.players = players;
    }

    public Set<TournamentDTO> getTournaments() {
        return tournaments;
    }

    public void setTournaments(Set<TournamentDTO> tournaments) {
        this.tournaments = tournaments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TeamDTO)) {
            return false;
        }

        TeamDTO teamDTO = (TeamDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, teamDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TeamDTO{" +
            "id=" + getId() +
            ", teamName='" + getTeamName() + "'" +
            ", level='" + getLevel() + "'" +
            ", category='" + getCategory() + "'" +
            ", players=" + getPlayers() +
            ", tournaments=" + getTournaments() +
            "}";
    }
}
