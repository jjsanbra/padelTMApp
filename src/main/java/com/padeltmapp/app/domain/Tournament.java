package com.padeltmapp.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @Column(name = "last_inscriptions_date")
    private Instant lastInscriptionsDate;

    @Min(value = 4)
    @Max(value = 120)
    @Column(name = "max_teams_allowed")
    private Integer maxTeamsAllowed;

    @Column(name = "prices")
    private String prices;

    @Column(name = "active")
    private Boolean active;

    @Lob
    @Column(name = "poster")
    private byte[] poster;

    @Column(name = "poster_content_type")
    private String posterContentType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__sponsors",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "sponsors_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<Sponsor> sponsors = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__categories",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "categories_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__levels",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "levels_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<Level> levels = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tournament__court_types",
        joinColumns = @JoinColumn(name = "tournament_id"),
        inverseJoinColumns = @JoinColumn(name = "court_types_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Set<CourtType> courtTypes = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "tournaments", "country" }, allowSetters = true)
    private Location location;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "tournaments")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "team", "tournaments" }, allowSetters = true)
    private Set<RegisterTeam> registerTeams = new HashSet<>();

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

    public Integer getMaxTeamsAllowed() {
        return this.maxTeamsAllowed;
    }

    public Tournament maxTeamsAllowed(Integer maxTeamsAllowed) {
        this.setMaxTeamsAllowed(maxTeamsAllowed);
        return this;
    }

    public void setMaxTeamsAllowed(Integer maxTeamsAllowed) {
        this.maxTeamsAllowed = maxTeamsAllowed;
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

    public byte[] getPoster() {
        return this.poster;
    }

    public Tournament poster(byte[] poster) {
        this.setPoster(poster);
        return this;
    }

    public void setPoster(byte[] poster) {
        this.poster = poster;
    }

    public String getPosterContentType() {
        return this.posterContentType;
    }

    public Tournament posterContentType(String posterContentType) {
        this.posterContentType = posterContentType;
        return this;
    }

    public void setPosterContentType(String posterContentType) {
        this.posterContentType = posterContentType;
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

    public Tournament addSponsors(Sponsor sponsor) {
        this.sponsors.add(sponsor);
        return this;
    }

    public Tournament removeSponsors(Sponsor sponsor) {
        this.sponsors.remove(sponsor);
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

    public Tournament addCategories(Category category) {
        this.categories.add(category);
        return this;
    }

    public Tournament removeCategories(Category category) {
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

    public Tournament addLevels(Level level) {
        this.levels.add(level);
        return this;
    }

    public Tournament removeLevels(Level level) {
        this.levels.remove(level);
        return this;
    }

    public Set<CourtType> getCourtTypes() {
        return this.courtTypes;
    }

    public void setCourtTypes(Set<CourtType> courtTypes) {
        this.courtTypes = courtTypes;
    }

    public Tournament courtTypes(Set<CourtType> courtTypes) {
        this.setCourtTypes(courtTypes);
        return this;
    }

    public Tournament addCourtTypes(CourtType courtType) {
        this.courtTypes.add(courtType);
        return this;
    }

    public Tournament removeCourtTypes(CourtType courtType) {
        this.courtTypes.remove(courtType);
        return this;
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

    public Set<RegisterTeam> getRegisterTeams() {
        return this.registerTeams;
    }

    public void setRegisterTeams(Set<RegisterTeam> registerTeams) {
        if (this.registerTeams != null) {
            this.registerTeams.forEach(i -> i.removeTournaments(this));
        }
        if (registerTeams != null) {
            registerTeams.forEach(i -> i.addTournaments(this));
        }
        this.registerTeams = registerTeams;
    }

    public Tournament registerTeams(Set<RegisterTeam> registerTeams) {
        this.setRegisterTeams(registerTeams);
        return this;
    }

    public Tournament addRegisterTeam(RegisterTeam registerTeam) {
        this.registerTeams.add(registerTeam);
        registerTeam.getTournaments().add(this);
        return this;
    }

    public Tournament removeRegisterTeam(RegisterTeam registerTeam) {
        this.registerTeams.remove(registerTeam);
        registerTeam.getTournaments().remove(this);
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
            ", lastInscriptionsDate='" + getLastInscriptionsDate() + "'" +
            ", maxTeamsAllowed=" + getMaxTeamsAllowed() +
            ", prices='" + getPrices() + "'" +
            ", active='" + getActive() + "'" +
            ", poster='" + getPoster() + "'" +
            ", posterContentType='" + getPosterContentType() + "'" +
            "}";
    }
}
