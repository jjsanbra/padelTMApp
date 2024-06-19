package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.RegisterTeam;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface RegisterTeamRepositoryWithBagRelationships {
    Optional<RegisterTeam> fetchBagRelationships(Optional<RegisterTeam> registerTeam);

    List<RegisterTeam> fetchBagRelationships(List<RegisterTeam> registerTeams);

    Page<RegisterTeam> fetchBagRelationships(Page<RegisterTeam> registerTeams);
}
