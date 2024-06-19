package com.padeltmapp.app.repository;

import com.padeltmapp.app.domain.RegisterTeam;
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
public class RegisterTeamRepositoryWithBagRelationshipsImpl implements RegisterTeamRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String REGISTERTEAMS_PARAMETER = "registerTeams";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<RegisterTeam> fetchBagRelationships(Optional<RegisterTeam> registerTeam) {
        return registerTeam.map(this::fetchTournaments);
    }

    @Override
    public Page<RegisterTeam> fetchBagRelationships(Page<RegisterTeam> registerTeams) {
        return new PageImpl<>(
            fetchBagRelationships(registerTeams.getContent()),
            registerTeams.getPageable(),
            registerTeams.getTotalElements()
        );
    }

    @Override
    public List<RegisterTeam> fetchBagRelationships(List<RegisterTeam> registerTeams) {
        return Optional.of(registerTeams).map(this::fetchTournaments).orElse(Collections.emptyList());
    }

    RegisterTeam fetchTournaments(RegisterTeam result) {
        return entityManager
            .createQuery(
                "select registerTeam from RegisterTeam registerTeam left join fetch registerTeam.tournaments where registerTeam.id = :id",
                RegisterTeam.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<RegisterTeam> fetchTournaments(List<RegisterTeam> registerTeams) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, registerTeams.size()).forEach(index -> order.put(registerTeams.get(index).getId(), index));
        List<RegisterTeam> result = entityManager
            .createQuery(
                "select registerTeam from RegisterTeam registerTeam left join fetch registerTeam.tournaments where registerTeam in :registerTeams",
                RegisterTeam.class
            )
            .setParameter(REGISTERTEAMS_PARAMETER, registerTeams)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
