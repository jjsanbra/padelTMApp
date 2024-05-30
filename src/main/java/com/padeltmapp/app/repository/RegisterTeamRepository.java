package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.RegisterTeam;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RegisterTeam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegisterTeamRepository extends JpaRepository<RegisterTeam, Long> {}
