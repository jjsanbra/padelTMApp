package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Category;
import com.padeltmapp.app.domain.Player;
import com.padeltmapp.app.domain.Team;
import com.padeltmapp.app.service.dto.CategoryDTO;
import com.padeltmapp.app.service.dto.PlayerDTO;
import com.padeltmapp.app.service.dto.TeamDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Player} and its DTO {@link PlayerDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlayerMapper extends EntityMapper<PlayerDTO, Player> {
    @Mapping(target = "categories", source = "categories", qualifiedByName = "categoryDescriptionSet")
    @Mapping(target = "teams", source = "teams", qualifiedByName = "teamTeamNameSet")
    PlayerDTO toDto(Player s);

    @Mapping(target = "removeCategory", ignore = true)
    @Mapping(target = "teams", ignore = true)
    @Mapping(target = "removeTeams", ignore = true)
    Player toEntity(PlayerDTO playerDTO);

    @Named("categoryDescription")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    CategoryDTO toDtoCategoryDescription(Category category);

    @Named("categoryDescriptionSet")
    default Set<CategoryDTO> toDtoCategoryDescriptionSet(Set<Category> category) {
        return category.stream().map(this::toDtoCategoryDescription).collect(Collectors.toSet());
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
}
