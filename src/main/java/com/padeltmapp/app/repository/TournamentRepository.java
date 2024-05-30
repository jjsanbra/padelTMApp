package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.Tournament;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Tournament entity.
 *
 * When extending this class, extend TournamentRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface TournamentRepository extends TournamentRepositoryWithBagRelationships, JpaRepository<Tournament, Long> {
    default Optional<Tournament> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Tournament> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Tournament> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select tournament from Tournament tournament left join fetch tournament.location",
        countQuery = "select count(tournament) from Tournament tournament"
    )
    Page<Tournament> findAllWithToOneRelationships(Pageable pageable);

    @Query("select tournament from Tournament tournament left join fetch tournament.location")
    List<Tournament> findAllWithToOneRelationships();

    @Query("select tournament from Tournament tournament left join fetch tournament.location where tournament.id =:id")
    Optional<Tournament> findOneWithToOneRelationships(@Param("id") Long id);
}
