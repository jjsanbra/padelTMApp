package com.padeltmapp.app.service.mapper;

import com.padeltmapp.app.domain.RegisterTeam;
import com.padeltmapp.app.service.dto.RegisterTeamDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RegisterTeam} and its DTO {@link RegisterTeamDTO}.
 */
@Mapper(componentModel = "spring")
public interface RegisterTeamMapper extends EntityMapper<RegisterTeamDTO, RegisterTeam> {}
