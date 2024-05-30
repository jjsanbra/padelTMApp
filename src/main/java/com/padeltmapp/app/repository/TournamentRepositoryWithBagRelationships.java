package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.Tournament;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TournamentRepositoryWithBagRelationships {
    Optional<Tournament> fetchBagRelationships(Optional<Tournament> tournament);

    List<Tournament> fetchBagRelationships(List<Tournament> tournaments);

    Page<Tournament> fetchBagRelationships(Page<Tournament> tournaments);
}
