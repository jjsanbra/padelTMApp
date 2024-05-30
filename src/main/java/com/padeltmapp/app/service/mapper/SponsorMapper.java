package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Sponsor;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.SponsorDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Sponsor} and its DTO {@link SponsorDTO}.
 */
@Mapper(componentModel = "spring")
public interface SponsorMapper extends EntityMapper<SponsorDTO, Sponsor> {
    @Mapping(target = "tournaments", source = "tournaments", qualifiedByName = "tournamentTournamentNameSet")
    SponsorDTO toDto(Sponsor s);

    @Mapping(target = "tournaments", ignore = true)
    @Mapping(target = "removeTournaments", ignore = true)
    Sponsor toEntity(SponsorDTO sponsorDTO);

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
