package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Category;
import com.padeltmapp.app.domain.Player;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.CategoryDTO;
import com.padeltmapp.app.service.dto.PlayerDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Category} and its DTO {@link CategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper extends EntityMapper<CategoryDTO, Category> {
    @Mapping(target = "tournaments", source = "tournaments", qualifiedByName = "tournamentTournamentNameSet")
    @Mapping(target = "players", source = "players", qualifiedByName = "playerFirstNameSet")
    CategoryDTO toDto(Category s);

    @Mapping(target = "tournaments", ignore = true)
    @Mapping(target = "removeTournaments", ignore = true)
    @Mapping(target = "players", ignore = true)
    @Mapping(target = "removePlayers", ignore = true)
    Category toEntity(CategoryDTO categoryDTO);

    @Named("tournamentTournamentName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "tournamentName", source = "tournamentName")
    TournamentDTO toDtoTournamentTournamentName(Tournament tournament);

    @Named("tournamentTournamentNameSet")
    default Set<TournamentDTO> toDtoTournamentTournamentNameSet(Set<Tournament> tournament) {
        return tournament.stream().map(this::toDtoTournamentTournamentName).collect(Collectors.toSet());
    }

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
