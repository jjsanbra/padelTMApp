package com.padeltmapp.app.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.CourtType} entity.
 */
@Schema(description = "The Court Type entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourtTypeDTO implements Serializable {

    private Long id;

    @NotNull
    private String courtTypeName;

    private String description;

    private Set<TournamentDTO> tournaments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourtTypeName() {
        return courtTypeName;
    }

    public void setCourtTypeName(String courtTypeName) {
        this.courtTypeName = courtTypeName;
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
        if (!(o instanceof CourtTypeDTO)) {
            return false;
        }

        CourtTypeDTO courtTypeDTO = (CourtTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, courtTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourtTypeDTO{" +
            "id=" + getId() +
            ", courtTypeName='" + getCourtTypeName() + "'" +
            ", description='" + getDescription() + "'" +
            ", tournaments=" + getTournaments() +
            "}";
    }
}
