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
 * The Court Type entity.
 */
@Entity
@Table(name = "court_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourtType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "court_type_name", nullable = false)
    private String courtTypeName;

    @Column(name = "description")
    private String description;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "courtTypes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sponsors", "categories", "levels", "courtTypes", "location", "registerTeams" }, allowSetters = true)
    private Set<Tournament> tournaments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CourtType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourtTypeName() {
        return this.courtTypeName;
    }

    public CourtType courtTypeName(String courtTypeName) {
        this.setCourtTypeName(courtTypeName);
        return this;
    }

    public void setCourtTypeName(String courtTypeName) {
        this.courtTypeName = courtTypeName;
    }

    public String getDescription() {
        return this.description;
    }

    public CourtType description(String description) {
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
            this.tournaments.forEach(i -> i.removeCourtTypes(this));
        }
        if (tournaments != null) {
            tournaments.forEach(i -> i.addCourtTypes(this));
        }
        this.tournaments = tournaments;
    }

    public CourtType tournaments(Set<Tournament> tournaments) {
        this.setTournaments(tournaments);
        return this;
    }

    public CourtType addTournaments(Tournament tournament) {
        this.tournaments.add(tournament);
        tournament.getCourtTypes().add(this);
        return this;
    }

    public CourtType removeTournaments(Tournament tournament) {
        this.tournaments.remove(tournament);
        tournament.getCourtTypes().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourtType)) {
            return false;
        }
        return getId() != null && getId().equals(((CourtType) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourtType{" +
            "id=" + getId() +
            ", courtTypeName='" + getCourtTypeName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
