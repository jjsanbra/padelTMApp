package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Player;
import com.padeltmapp.app.domain.Team;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.PlayerDTO;
import com.padeltmapp.app.service.dto.TeamDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Team} and its DTO {@link TeamDTO}.
 */
@Mapper(componentModel = "spring")
public interface TeamMapper extends EntityMapper<TeamDTO, Team> {
    @Mapping(target = "players", source = "players", qualifiedByName = "playerFirstNameSet")
    @Mapping(target = "tournaments", source = "tournaments", qualifiedByName = "tournamentTournamentNameSet")
    TeamDTO toDto(Team s);

    @Mapping(target = "removePlayer", ignore = true)
    @Mapping(target = "tournaments", ignore = true)
    @Mapping(target = "removeTournaments", ignore = true)
    Team toEntity(TeamDTO teamDTO);

    @Named("playerFirstName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    PlayerDTO toDtoPlayerFirstName(Player player);

    @Named("playerFirstNameSet")
    default Set<PlayerDTO> toDtoPlayerFirstNameSet(Set<Player> player) {
        return player.stream().map(this::toDtoPlayerFirstName).collect(Collectors.toSet());
    }

    @Named("tournamentTournamentName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "tournamentName", source = "tournamentName")
    TournamentDTO toDtoTournamentTournamentName(Tournament tournament);

    @Named("tournamentTournamentNameSet")
    default Set<TournamentDTO> toDtoTournamentTournamentNameSet(Set<Tournament> tournament) {
        return tournament.stream().map(this::toDtoTournamentTournamentName).collect(Collectors.toSet());
    }
}
