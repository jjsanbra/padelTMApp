package com.padeltmapp.app.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.RegisterTeam} entity.
 */
@Schema(description = "The Team Registration entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RegisterTeamDTO implements Serializable {

    private Long id;

    @NotNull
    private String teamName;

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
            ", teamName='" + getTeamName() + "'" +
            "}";
    }
}
