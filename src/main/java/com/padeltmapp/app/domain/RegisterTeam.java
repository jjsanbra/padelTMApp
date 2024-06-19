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
 * The Team Registration entity.
 */
@Entity
@Table(name = "register_team")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RegisterTeam implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "register_date", nullable = false)
    private Instant registerDate;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "level", "category", "players", "registerTeams" }, allowSetters = true)
    private Team team;

    @ManyToMany(fetch = FetchType.LAZY)
    @NotNull
    @JoinTable(
        name = "rel_register_team__tournaments",
        joinColumns = @JoinColumn(name = "register_team_id"),
        inverseJoinColumns = @JoinColumn(name = "tournaments_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sponsors", "categories", "levels", "courtTypes", "location", "registerTeams" }, allowSetters = true)
    private Set<Tournament> tournaments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RegisterTeam id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRegisterDate() {
        return this.registerDate;
    }

    public RegisterTeam registerDate(Instant registerDate) {
        this.setRegisterDate(registerDate);
        return this;
    }

    public void setRegisterDate(Instant registerDate) {
        this.registerDate = registerDate;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public RegisterTeam team(Team team) {
        this.setTeam(team);
        return this;
    }

    public Set<Tournament> getTournaments() {
        return this.tournaments;
    }

    public void setTournaments(Set<Tournament> tournaments) {
        this.tournaments = tournaments;
    }

    public RegisterTeam tournaments(Set<Tournament> tournaments) {
        this.setTournaments(tournaments);
        return this;
    }

    public RegisterTeam addTournaments(Tournament tournament) {
        this.tournaments.add(tournament);
        return this;
    }

    public RegisterTeam removeTournaments(Tournament tournament) {
        this.tournaments.remove(tournament);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RegisterTeam)) {
            return false;
        }
        return getId() != null && getId().equals(((RegisterTeam) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RegisterTeam{" +
            "id=" + getId() +
            ", registerDate='" + getRegisterDate() + "'" +
            "}";
    }
}
