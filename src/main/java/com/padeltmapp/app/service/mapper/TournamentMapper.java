package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.Category;
import com.padeltmapp.app.domain.CourtType;
import com.padeltmapp.app.domain.Level;
import com.padeltmapp.app.domain.Location;
import com.padeltmapp.app.domain.RegisterTeam;
import com.padeltmapp.app.domain.Sponsor;
import com.padeltmapp.app.domain.Tournament;
import com.padeltmapp.app.service.dto.CategoryDTO;
import com.padeltmapp.app.service.dto.CourtTypeDTO;
import com.padeltmapp.app.service.dto.LevelDTO;
import com.padeltmapp.app.service.dto.LocationDTO;
import com.padeltmapp.app.service.dto.RegisterTeamDTO;
import com.padeltmapp.app.service.dto.SponsorDTO;
import com.padeltmapp.app.service.dto.TournamentDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Tournament} and its DTO {@link TournamentDTO}.
 */
@Mapper(componentModel = "spring")
public interface TournamentMapper extends EntityMapper<TournamentDTO, Tournament> {
    @Mapping(target = "sponsors", source = "sponsors", qualifiedByName = "sponsorSponsorNameSet")
    @Mapping(target = "categories", source = "categories", qualifiedByName = "categoryCategoryNameSet")
    @Mapping(target = "levels", source = "levels", qualifiedByName = "levelLevelNameSet")
    @Mapping(target = "courtTypes", source = "courtTypes", qualifiedByName = "courtTypeCourtTypeNameSet")
    @Mapping(target = "location", source = "location", qualifiedByName = "locationCity")
    @Mapping(target = "registerTeams", source = "registerTeams", qualifiedByName = "registerTeamIdSet")
    TournamentDTO toDto(Tournament s);

    @Mapping(target = "removeSponsors", ignore = true)
    @Mapping(target = "removeCategories", ignore = true)
    @Mapping(target = "removeLevels", ignore = true)
    @Mapping(target = "removeCourtTypes", ignore = true)
    @Mapping(target = "registerTeams", ignore = true)
    @Mapping(target = "removeRegisterTeam", ignore = true)
    Tournament toEntity(TournamentDTO tournamentDTO);

    @Named("sponsorSponsorName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "sponsorName", source = "sponsorName")
    SponsorDTO toDtoSponsorSponsorName(Sponsor sponsor);

    @Named("sponsorSponsorNameSet")
    default Set<SponsorDTO> toDtoSponsorSponsorNameSet(Set<Sponsor> sponsor) {
        return sponsor.stream().map(this::toDtoSponsorSponsorName).collect(Collectors.toSet());
    }

    @Named("categoryCategoryName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "categoryName", source = "categoryName")
    CategoryDTO toDtoCategoryCategoryName(Category category);

    @Named("categoryCategoryNameSet")
    default Set<CategoryDTO> toDtoCategoryCategoryNameSet(Set<Category> category) {
        return category.stream().map(this::toDtoCategoryCategoryName).collect(Collectors.toSet());
    }

    @Named("levelLevelName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "levelName", source = "levelName")
    LevelDTO toDtoLevelLevelName(Level level);

    @Named("levelLevelNameSet")
    default Set<LevelDTO> toDtoLevelLevelNameSet(Set<Level> level) {
        return level.stream().map(this::toDtoLevelLevelName).collect(Collectors.toSet());
    }

    @Named("courtTypeCourtTypeName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "courtTypeName", source = "courtTypeName")
    CourtTypeDTO toDtoCourtTypeCourtTypeName(CourtType courtType);

    @Named("courtTypeCourtTypeNameSet")
    default Set<CourtTypeDTO> toDtoCourtTypeCourtTypeNameSet(Set<CourtType> courtType) {
        return courtType.stream().map(this::toDtoCourtTypeCourtTypeName).collect(Collectors.toSet());
    }

    @Named("locationCity")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "city", source = "city")
    LocationDTO toDtoLocationCity(Location location);

    @Named("registerTeamId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RegisterTeamDTO toDtoRegisterTeamId(RegisterTeam registerTeam);

    @Named("registerTeamIdSet")
    default Set<RegisterTeamDTO> toDtoRegisterTeamIdSet(Set<RegisterTeam> registerTeam) {
        return registerTeam.stream().map(this::toDtoRegisterTeamId).collect(Collectors.toSet());
    }
}
