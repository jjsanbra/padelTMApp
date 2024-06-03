package com.padeltmapp.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Team entity.
 */
@Entity
@Table(name = "team")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "team_name", unique = true)
    private String teamName;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Level level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "tournaments" }, allowSetters = true)
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY)
    @NotNull
    @JoinTable(
        name = "rel_team__players",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "players_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "level", "teams" }, allowSetters = true)
    private Set<Player> players = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "teams")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "location", "sponsors", "teams", "categories", "levels" }, allowSetters = true)
    private Set<Tournament> tournaments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Team id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamName() {
        return this.teamName;
    }

    public Team teamName(String teamName) {
        this.setTeamName(teamName);
        return this;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public byte[] getLogo() {
        return this.logo;
    }

    public Team logo(byte[] logo) {
        this.setLogo(logo);
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return this.logoContentType;
    }

    public Team logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Level getLevel() {
        return this.level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Team level(Level level) {
        this.setLevel(level);
        return this;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Team category(Category category) {
        this.setCategory(category);
        return this;
    }

    public Set<Player> getPlayers() {
        return this.players;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
    }

    public Team players(Set<Player> players) {
        this.setPlayers(players);
        return this;
    }

    public Team addPlayers(Player player) {
        this.players.add(player);
        return this;
    }

    public Team removePlayers(Player player) {
        this.players.remove(player);
        return this;
    }

    public Set<Tournament> getTournaments() {
        return this.tournaments;
    }

    public void setTournaments(Set<Tournament> tournaments) {
        if (this.tournaments != null) {
            this.tournaments.forEach(i -> i.removeTeams(this));
        }
        if (tournaments != null) {
            tournaments.forEach(i -> i.addTeams(this));
        }
        this.tournaments = tournaments;
    }

    public Team tournaments(Set<Tournament> tournaments) {
        this.setTournaments(tournaments);
        return this;
    }

    public Team addTournaments(Tournament tournament) {
        this.tournaments.add(tournament);
        tournament.getTeams().add(this);
        return this;
    }

    public Team removeTournaments(Tournament tournament) {
        this.tournaments.remove(tournament);
        tournament.getTeams().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Team)) {
            return false;
        }
        return getId() != null && getId().equals(((Team) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", teamName='" + getTeamName() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            "}";
    }
}
