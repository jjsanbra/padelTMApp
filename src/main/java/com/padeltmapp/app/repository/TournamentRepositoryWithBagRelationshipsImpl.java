package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.Tournament;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TournamentRepositoryWithBagRelationshipsImpl implements TournamentRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String TOURNAMENTS_PARAMETER = "tournaments";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Tournament> fetchBagRelationships(Optional<Tournament> tournament) {
        return tournament.map(this::fetchSponsors).map(this::fetchTeams).map(this::fetchCategories).map(this::fetchLevels);
    }

    @Override
    public Page<Tournament> fetchBagRelationships(Page<Tournament> tournaments) {
        return new PageImpl<>(fetchBagRelationships(tournaments.getContent()), tournaments.getPageable(), tournaments.getTotalElements());
    }

    @Override
    public List<Tournament> fetchBagRelationships(List<Tournament> tournaments) {
        return Optional.of(tournaments)
            .map(this::fetchSponsors)
            .map(this::fetchTeams)
            .map(this::fetchCategories)
            .map(this::fetchLevels)
            .orElse(Collections.emptyList());
    }

    Tournament fetchSponsors(Tournament result) {
        return entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.sponsors where tournament.id = :id",
                Tournament.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Tournament> fetchSponsors(List<Tournament> tournaments) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tournaments.size()).forEach(index -> order.put(tournaments.get(index).getId(), index));
        List<Tournament> result = entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.sponsors where tournament in :tournaments",
                Tournament.class
            )
            .setParameter(TOURNAMENTS_PARAMETER, tournaments)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    Tournament fetchTeams(Tournament result) {
        return entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.teams where tournament.id = :id",
                Tournament.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Tournament> fetchTeams(List<Tournament> tournaments) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tournaments.size()).forEach(index -> order.put(tournaments.get(index).getId(), index));
        List<Tournament> result = entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.teams where tournament in :tournaments",
                Tournament.class
            )
            .setParameter(TOURNAMENTS_PARAMETER, tournaments)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    Tournament fetchCategories(Tournament result) {
        return entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.categories where tournament.id = :id",
                Tournament.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Tournament> fetchCategories(List<Tournament> tournaments) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tournaments.size()).forEach(index -> order.put(tournaments.get(index).getId(), index));
        List<Tournament> result = entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.categories where tournament in :tournaments",
                Tournament.class
            )
            .setParameter(TOURNAMENTS_PARAMETER, tournaments)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    Tournament fetchLevels(Tournament result) {
        return entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.levels where tournament.id = :id",
                Tournament.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Tournament> fetchLevels(List<Tournament> tournaments) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tournaments.size()).forEach(index -> order.put(tournaments.get(index).getId(), index));
        List<Tournament> result = entityManager
            .createQuery(
                "select tournament from Tournament tournament left join fetch tournament.levels where tournament in :tournaments",
                Tournament.class
            )
            .setParameter(TOURNAMENTS_PARAMETER, tournaments)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
