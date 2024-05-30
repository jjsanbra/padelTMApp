package com.padeltmapp.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Tournament entity.
 */
@Entity
@Table(name = "tournament")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tournament implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tournament_name")
    private String tournamentName;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "last_inscriptions_date")
    private Instant lastInscriptionsDate;

    @Column(name = "limit_pax")
    private Integer limitPax;

    @Column(name = "prices")
    private String prices;

    @Column(name = "active")
    private Boolean active;

    @JsonIgnoreProperties(value = { "country", "tournament" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Location location;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__sponsor",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "sponsor_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<Sponsor> sponsors = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__team",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "players", "tournaments" }, allowSetters = true)
    private Set<Team> teams = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__category",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__level",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "level_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<Level> levels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tournament id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTournamentName() {
        return this.tournamentName;
    }

    public Tournament tournamentName(String tournamentName) {
        this.setTournamentName(tournamentName);
        return this;
    }

    public void setTournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
    }

    public String getDescription() {
        return this.description;
    }

    public Tournament description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public Tournament startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return this.endDate;
    }

    public Tournament endDate(Instant endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getStartTime() {
        return this.startTime;
    }

    public Tournament startTime(Instant startTime) {
        this.setStartTime(startTime);
        return this;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return this.endTime;
    }

    public Tournament endTime(Instant endTime) {
        this.setEndTime(endTime);
        return this;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public Instant getLastInscriptionsDate() {
        return this.lastInscriptionsDate;
    }

    public Tournament lastInscriptionsDate(Instant lastInscriptionsDate) {
        this.setLastInscriptionsDate(lastInscriptionsDate);
        return this;
    }

    public void setLastInscriptionsDate(Instant lastInscriptionsDate) {
        this.lastInscriptionsDate = lastInscriptionsDate;
    }

    public Integer getLimitPax() {
        return this.limitPax;
    }

    public Tournament limitPax(Integer limitPax) {
        this.setLimitPax(limitPax);
        return this;
    }

    public void setLimitPax(Integer limitPax) {
        this.limitPax = limitPax;
    }

    public String getPrices() {
        return this.prices;
    }

    public Tournament prices(String prices) {
        this.setPrices(prices);
        return this;
    }

    public void setPrices(String prices) {
        this.prices = prices;
    }

    public Boolean getActive() {
        return this.active;
    }

    public Tournament active(Boolean active) {
        this.setActive(active);
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Tournament location(Location location) {
        this.setLocation(location);
        return this;
    }

    public Set<Sponsor> getSponsors() {
        return this.sponsors;
    }

    public void setSponsors(Set<Sponsor> sponsors) {
        this.sponsors = sponsors;
    }

    public Tournament sponsors(Set<Sponsor> sponsors) {
        this.setSponsors(sponsors);
        return this;
    }

    public Tournament addSponsor(Sponsor sponsor) {
        this.sponsors.add(sponsor);
        return this;
    }

    public Tournament removeSponsor(Sponsor sponsor) {
        this.sponsors.remove(sponsor);
        return this;
    }

    public Set<Team> getTeams() {
        return this.teams;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }

    public Tournament teams(Set<Team> teams) {
        this.setTeams(teams);
        return this;
    }

    public Tournament addTeam(Team team) {
        this.teams.add(team);
        return this;
    }

    public Tournament removeTeam(Team team) {
        this.teams.remove(team);
        return this;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Tournament categories(Set<Category> categories) {
        this.setCategories(categories);
        return this;
    }

    public Tournament addCategory(Category category) {
        this.categories.add(category);
        return this;
    }

    public Tournament removeCategory(Category category) {
        this.categories.remove(category);
        return this;
    }

    public Set<Level> getLevels() {
        return this.levels;
    }

    public void setLevels(Set<Level> levels) {
        this.levels = levels;
    }

    public Tournament levels(Set<Level> levels) {
        this.setLevels(levels);
        return this;
    }

    public Tournament addLevel(Level level) {
        this.levels.add(level);
        return this;
    }

    public Tournament removeLevel(Level level) {
        this.levels.remove(level);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tournament)) {
            return false;
        }
        return getId() != null && getId().equals(((Tournament) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tournament{" +
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
            "}";
    }
}
