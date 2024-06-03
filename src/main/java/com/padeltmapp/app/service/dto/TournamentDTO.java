package com.padeltmapp.app.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.padeltmapp.app.domain.Tournament} entity.
 */
@Schema(description = "Tournament entity.")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TournamentDTO implements Serializable {

    private Long id;

    private String tournamentName;

    private String description;

    private Instant startDate;

    private Instant endDate;

    private Instant lastInscriptionsDate;

    @Min(value = 4)
    @Max(value = 120)
    private Integer maxTeamsAllowed;

    private String prices;

    private Boolean active;

    @Lob
    private byte[] poster;

    private String posterContentType;

    private LocationDTO location;

    private Set<SponsorDTO> sponsors = new HashSet<>();

    private Set<TeamDTO> teams = new HashSet<>();

    private Set<CategoryDTO> categories = new HashSet<>();

    private Set<LevelDTO> levels = new HashSet<>();

    private Set<CourtTypeDTO> courtTypes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTournamentName() {
        return tournamentName;
    }

    public void setTournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getLastInscriptionsDate() {
        return lastInscriptionsDate;
    }

    public void setLastInscriptionsDate(Instant lastInscriptionsDate) {
        this.lastInscriptionsDate = lastInscriptionsDate;
    }

    public Integer getMaxTeamsAllowed() {
        return maxTeamsAllowed;
    }

    public void setMaxTeamsAllowed(Integer maxTeamsAllowed) {
        this.maxTeamsAllowed = maxTeamsAllowed;
    }

    public String getPrices() {
        return prices;
    }

    public void setPrices(String prices) {
        this.prices = prices;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public byte[] getPoster() {
        return poster;
    }

    public void setPoster(byte[] poster) {
        this.poster = poster;
    }

    public String getPosterContentType() {
        return posterContentType;
    }

    public void setPosterContentType(String posterContentType) {
        this.posterContentType = posterContentType;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public Set<SponsorDTO> getSponsors() {
        return sponsors;
    }

    public void setSponsors(Set<SponsorDTO> sponsors) {
        this.sponsors = sponsors;
    }

    public Set<TeamDTO> getTeams() {
        return teams;
    }

    public void setTeams(Set<TeamDTO> teams) {
        this.teams = teams;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDTO> categories) {
        this.categories = categories;
    }

    public Set<LevelDTO> getLevels() {
        return levels;
    }

    public void setLevels(Set<LevelDTO> levels) {
        this.levels = levels;
    }

    public Set<CourtTypeDTO> getCourtTypes() {
        return courtTypes;
    }

    public void setCourtTypes(Set<CourtTypeDTO> courtTypes) {
        this.courtTypes = courtTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TournamentDTO)) {
            return false;
        }

        TournamentDTO tournamentDTO = (TournamentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tournamentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TournamentDTO{" +
            "id=" + getId() +
            ", tournamentName='" + getTournamentName() + "'" +
            ", description='" + getDescription() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", lastInscriptionsDate='" + getLastInscriptionsDate() + "'" +
            ", maxTeamsAllowed=" + getMaxTeamsAllowed() +
            ", prices='" + getPrices() + "'" +
            ", active='" + getActive() + "'" +
            ", poster='" + getPoster() + "'" +
            ", location=" + getLocation() +
            ", sponsors=" + getSponsors() +
            ", teams=" + getTeams() +
            ", categories=" + getCategories() +
            ", levels=" + getLevels() +
            ", courtTypes=" + getCourtTypes() +
            "}";
    }
}
