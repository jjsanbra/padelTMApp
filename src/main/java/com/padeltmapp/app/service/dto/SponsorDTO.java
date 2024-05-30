package com.padeltmapp.app.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.Sponsor} entity.
 */
@Schema(description = "The Sponsor entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SponsorDTO implements Serializable {

    private Long id;

    @NotNull
    private String sponsorName;

    private String description;

    @Lob
    private byte[] logo;

    private String logoContentType;

    private Set<TournamentDTO> tournaments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
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
        if (!(o instanceof SponsorDTO)) {
            return false;
        }

        SponsorDTO sponsorDTO = (SponsorDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, sponsorDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SponsorDTO{" +
            "id=" + getId() +
            ", sponsorName='" + getSponsorName() + "'" +
            ", description='" + getDescription() + "'" +
            ", logo='" + getLogo() + "'" +
            ", tournaments=" + getTournaments() +
            "}";
    }
}
