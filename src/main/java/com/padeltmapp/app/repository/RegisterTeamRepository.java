package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.RegisterTeam;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RegisterTeam entity.
 *
 * When extending this class, extend RegisterTeamRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface RegisterTeamRepository extends RegisterTeamRepositoryWithBagRelationships, JpaRepository<RegisterTeam, Long> {
    default Optional<RegisterTeam> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<RegisterTeam> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<RegisterTeam> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select registerTeam from RegisterTeam registerTeam left join fetch registerTeam.team",
        countQuery = "select count(registerTeam) from RegisterTeam registerTeam"
    )
    Page<RegisterTeam> findAllWithToOneRelationships(Pageable pageable);

    @Query("select registerTeam from RegisterTeam registerTeam left join fetch registerTeam.team")
    List<RegisterTeam> findAllWithToOneRelationships();

    @Query("select registerTeam from RegisterTeam registerTeam left join fetch registerTeam.team where registerTeam.id =:id")
    Optional<RegisterTeam> findOneWithToOneRelationships(@Param("id") Long id);
}
