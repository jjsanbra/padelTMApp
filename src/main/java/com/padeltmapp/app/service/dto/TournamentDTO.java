package com.padeltmapp.app.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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

    private Instant startTime;

    private Instant endTime;

    private Instant lastInscriptionsDate;

    private Integer limitPax;

    private String prices;

    private Boolean active;

    private LocationDTO location;

    private Set<SponsorDTO> sponsors = new HashSet<>();

    private Set<TeamDTO> teams = new HashSet<>();

    private Set<CategoryDTO> categories = new HashSet<>();

    private Set<LevelDTO> levels = new HashSet<>();

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

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public Instant getLastInscriptionsDate() {
        return lastInscriptionsDate;
    }

    public void setLastInscriptionsDate(Instant lastInscriptionsDate) {
        this.lastInscriptionsDate = lastInscriptionsDate;
    }

    public Integer getLimitPax() {
        return limitPax;
    }

    public void setLimitPax(Integer limitPax) {
        this.limitPax = limitPax;
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
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", lastInscriptionsDate='" + getLastInscriptionsDate() + "'" +
            ", limitPax=" + getLimitPax() +
            ", prices='" + getPrices() + "'" +
            ", active='" + getActive() + "'" +
            ", location=" + getLocation() +
            ", sponsors=" + getSponsors() +
            ", teams=" + getTeams() +
            ", categories=" + getCategories() +
            ", levels=" + getLevels() +
            "}";
    }
}
