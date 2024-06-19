package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.RegisterTeam;
import com.padeltmapp.app.domain.Team;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.RegisterTeamDTO;
import com.padeltmapp.app.service.dto.TeamDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RegisterTeam} and its DTO {@link RegisterTeamDTO}.
 */
@Mapper(componentModel = "spring")
public interface RegisterTeamMapper extends EntityMapper<RegisterTeamDTO, RegisterTeam> {
    @Mapping(target = "team", source = "team", qualifiedByName = "teamTeamName")
    @Mapping(target = "tournaments", source = "tournaments", qualifiedByName = "tournamentTournamentNameSet")
    RegisterTeamDTO toDto(RegisterTeam s);

    @Mapping(target = "removeTournaments", ignore = true)
    RegisterTeam toEntity(RegisterTeamDTO registerTeamDTO);

    @Named("teamTeamName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "teamName", source = "teamName")
    TeamDTO toDtoTeamTeamName(Team team);

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
