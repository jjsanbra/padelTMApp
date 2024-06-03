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
 * The Level entity.
 */
@Entity
@Table(name = "level")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Level implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "level_name", nullable = false)
    private String levelName;

    @Column(name = "description")
    private String description;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "levels")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "location", "sponsors", "teams", "categories", "levels", "courtTypes" }, allowSetters = true)
    private Set<Tournament> tournaments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Level id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLevelName() {
        return this.levelName;
    }

    public Level levelName(String levelName) {
        this.setLevelName(levelName);
        return this;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getDescription() {
        return this.description;
    }

    public Level description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Tournament> getTournaments() {
        return this.tournaments;
    }

    public void setTournaments(Set<Tournament> tournaments) {
        if (this.tournaments != null) {
            this.tournaments.forEach(i -> i.removeLevels(this));
        }
        if (tournaments != null) {
            tournaments.forEach(i -> i.addLevels(this));
        }
        this.tournaments = tournaments;
    }

    public Level tournaments(Set<Tournament> tournaments) {
        this.setTournaments(tournaments);
        return this;
    }

    public Level addTournaments(Tournament tournament) {
        this.tournaments.add(tournament);
        tournament.getLevels().add(this);
        return this;
    }

    public Level removeTournaments(Tournament tournament) {
        this.tournaments.remove(tournament);
        tournament.getLevels().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Level)) {
            return false;
        }
        return getId() != null && getId().equals(((Level) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Level{" +
            "id=" + getId() +
            ", levelName='" + getLevelName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
