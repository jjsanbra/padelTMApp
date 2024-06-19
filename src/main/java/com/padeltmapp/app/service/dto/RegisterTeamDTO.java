package com.padeltmapp.app.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.RegisterTeam} entity.
 */
@Schema(description = "The Team Registration entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RegisterTeamDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant registerDate;

    @NotNull
    private TeamDTO team;

    @NotNull
    private Set<TournamentDTO> tournaments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Instant registerDate) {
        this.registerDate = registerDate;
    }

    public TeamDTO getTeam() {
        return team;
    }

    public void setTeam(TeamDTO team) {
        this.team = team;
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
        if (!(o instanceof RegisterTeamDTO)) {
            return false;
        }

        RegisterTeamDTO registerTeamDTO = (RegisterTeamDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, registerTeamDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RegisterTeamDTO{" +
            "id=" + getId() +
            ", registerDate='" + getRegisterDate() + "'" +
            ", team=" + getTeam() +
            ", tournaments=" + getTournaments() +
            "}";
    }
}
