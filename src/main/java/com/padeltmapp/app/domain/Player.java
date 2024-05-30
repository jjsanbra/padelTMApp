package com.padeltmapp.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.padeltmapp.app.domain.enumeration.CategoryEnum;
import com.padeltmapp.app.domain.enumeration.LevelEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Player entity.
 */
@Entity
@Table(name = "player")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Min(value = 12)
    @Max(value = 80)
    @Column(name = "age")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private CategoryEnum category;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private LevelEnum level;

    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_player__category",
        joinColumns = @JoinColumn(name = "player_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tournaments", "players" }, allowSetters = true)
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "players")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "players", "tournaments" }, allowSetters = true)
    private Set<Team> teams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Player id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Player firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Player lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Player phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getAge() {
        return this.age;
    }

    public Player age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public CategoryEnum getCategory() {
        return this.category;
    }

    public Player category(CategoryEnum category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

    public LevelEnum getLevel() {
        return this.level;
    }

    public Player level(LevelEnum level) {
        this.setLevel(level);
        return this;
    }

    public void setLevel(LevelEnum level) {
        this.level = level;
    }

    public byte[] getAvatar() {
        return this.avatar;
    }

    public Player avatar(byte[] avatar) {
        this.setAvatar(avatar);
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return this.avatarContentType;
    }

    public Player avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Player categories(Set<Category> categories) {
        this.setCategories(categories);
        return this;
    }

    public Player addCategory(Category category) {
        this.categories.add(category);
        return this;
    }

    public Player removeCategory(Category category) {
        this.categories.remove(category);
        return this;
    }

    public Set<Team> getTeams() {
        return this.teams;
    }

    public void setTeams(Set<Team> teams) {
        if (this.teams != null) {
            this.teams.forEach(i -> i.removePlayer(this));
        }
        if (teams != null) {
            teams.forEach(i -> i.addPlayer(this));
        }
        this.teams = teams;
    }

    public Player teams(Set<Team> teams) {
        this.setTeams(teams);
        return this;
    }

    public Player addTeams(Team team) {
        this.teams.add(team);
        team.getPlayers().add(this);
        return this;
    }

    public Player removeTeams(Team team) {
        this.teams.remove(team);
        team.getPlayers().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        return getId() != null && getId().equals(((Player) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", age=" + getAge() +
            ", category='" + getCategory() + "'" +
            ", level='" + getLevel() + "'" +
            ", avatar='" + getAvatar() + "'" +
            ", avatarContentType='" + getAvatarContentType() + "'" +
            "}";
    }
}
