package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.CourtType;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.CourtTypeDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CourtType} and its DTO {@link CourtTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourtTypeMapper extends EntityMapper<CourtTypeDTO, CourtType> {
    @Mapping(target = "tournaments", source = "tournaments", qualifiedByName = "tournamentTournamentNameSet")
    CourtTypeDTO toDto(CourtType s);

    @Mapping(target = "tournaments", ignore = true)
    @Mapping(target = "removeTournaments", ignore = true)
    CourtType toEntity(CourtTypeDTO courtTypeDTO);

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
