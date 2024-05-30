package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TeamRepositoryWithBagRelationships {
    Optional<Team> fetchBagRelationships(Optional<Team> team);

    List<Team> fetchBagRelationships(List<Team> teams);

    Page<Team> fetchBagRelationships(Page<Team> teams);
}
