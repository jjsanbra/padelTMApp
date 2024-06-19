package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Category;
import com.padeltmapp.app.domain.Level;
import com.padeltmapp.app.domain.Player;
import com.padeltmapp.app.domain.Team;
import com.padeltmapp.app.service.dto.CategoryDTO;
import com.padeltmapp.app.service.dto.LevelDTO;
import com.padeltmapp.app.service.dto.PlayerDTO;
import com.padeltmapp.app.service.dto.TeamDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Team} and its DTO {@link TeamDTO}.
 */
@Mapper(componentModel = "spring")
public interface TeamMapper extends EntityMapper<TeamDTO, Team> {
    @Mapping(target = "level", source = "level", qualifiedByName = "levelLevelName")
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryCategoryName")
    @Mapping(target = "players", source = "players", qualifiedByName = "playerFirstNameSet")
    TeamDTO toDto(Team s);

    @Mapping(target = "removePlayers", ignore = true)
    Team toEntity(TeamDTO teamDTO);

    @Named("levelLevelName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "levelName", source = "levelName")
    LevelDTO toDtoLevelLevelName(Level level);

    @Named("categoryCategoryName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "categoryName", source = "categoryName")
    CategoryDTO toDtoCategoryCategoryName(Category category);

    @Named("playerFirstName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    PlayerDTO toDtoPlayerFirstName(Player player);

    @Named("playerFirstNameSet")
    default Set<PlayerDTO> toDtoPlayerFirstNameSet(Set<Player> player) {
        return player.stream().map(this::toDtoPlayerFirstName).collect(Collectors.toSet());
    }
}
