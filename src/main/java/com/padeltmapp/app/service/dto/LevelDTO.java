package com.padeltmapp.app.service.dto;

import com.padeltmapp.app.domain.enumeration.LevelEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.Level} entity.
 */
@Schema(description = "The Level entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LevelDTO implements Serializable {

    private Long id;

    @NotNull
    private LevelEnum levelName;

    private String description;

    private Set<TournamentDTO> tournaments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LevelEnum getLevelName() {
        return levelName;
    }

    public void setLevelName(LevelEnum levelName) {
        this.levelName = levelName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        if (!(o instanceof LevelDTO)) {
            return false;
        }

        LevelDTO levelDTO = (LevelDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, levelDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LevelDTO{" +
            "id=" + getId() +
            ", levelName='" + getLevelName() + "'" +
            ", description='" + getDescription() + "'" +
            ", tournaments=" + getTournaments() +
            "}";
    }
}
