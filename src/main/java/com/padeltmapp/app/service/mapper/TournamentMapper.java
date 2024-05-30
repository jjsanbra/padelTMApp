package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Category;
import com.padeltmapp.app.domain.Level;
import com.padeltmapp.app.domain.Location;
import com.padeltmapp.app.domain.Sponsor;
import com.padeltmapp.app.domain.Team;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.CategoryDTO;
import com.padeltmapp.app.service.dto.LevelDTO;
import com.padeltmapp.app.service.dto.LocationDTO;
import com.padeltmapp.app.service.dto.SponsorDTO;
import com.padeltmapp.app.service.dto.TeamDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Tournament} and its DTO {@link TournamentDTO}.
 */
@Mapper(componentModel = "spring")
public interface TournamentMapper extends EntityMapper<TournamentDTO, Tournament> {
    @Mapping(target = "location", source = "location", qualifiedByName = "locationCity")
    @Mapping(target = "sponsors", source = "sponsors", qualifiedByName = "sponsorSponsorNameSet")
    @Mapping(target = "teams", source = "teams", qualifiedByName = "teamTeamNameSet")
    @Mapping(target = "categories", source = "categories", qualifiedByName = "categoryDescriptionSet")
    @Mapping(target = "levels", source = "levels", qualifiedByName = "levelDescriptionSet")
    TournamentDTO toDto(Tournament s);

    @Mapping(target = "removeSponsor", ignore = true)
    @Mapping(target = "removeTeam", ignore = true)
    @Mapping(target = "removeCategory", ignore = true)
    @Mapping(target = "removeLevel", ignore = true)
    Tournament toEntity(TournamentDTO tournamentDTO);

    @Named("locationCity")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "city", source = "city")
    LocationDTO toDtoLocationCity(Location location);

    @Named("sponsorSponsorName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "sponsorName", source = "sponsorName")
    SponsorDTO toDtoSponsorSponsorName(Sponsor sponsor);

    @Named("sponsorSponsorNameSet")
    default Set<SponsorDTO> toDtoSponsorSponsorNameSet(Set<Sponsor> sponsor) {
        return sponsor.stream().map(this::toDtoSponsorSponsorName).collect(Collectors.toSet());
    }

    @Named("teamTeamName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "teamName", source = "teamName")
    TeamDTO toDtoTeamTeamName(Team team);

    @Named("teamTeamNameSet")
    default Set<TeamDTO> toDtoTeamTeamNameSet(Set<Team> team) {
        return team.stream().map(this::toDtoTeamTeamName).collect(Collectors.toSet());
    }

    @Named("categoryDescription")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    CategoryDTO toDtoCategoryDescription(Category category);

    @Named("categoryDescriptionSet")
    default Set<CategoryDTO> toDtoCategoryDescriptionSet(Set<Category> category) {
        return category.stream().map(this::toDtoCategoryDescription).collect(Collectors.toSet());
    }

    @Named("levelDescription")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    LevelDTO toDtoLevelDescription(Level level);

    @Named("levelDescriptionSet")
    default Set<LevelDTO> toDtoLevelDescriptionSet(Set<Level> level) {
        return level.stream().map(this::toDtoLevelDescription).collect(Collectors.toSet());
    }
}
