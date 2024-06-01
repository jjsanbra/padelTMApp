package com.padeltmapp.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class TournamentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Tournament getTournamentSample1() {
        return new Tournament().id(1L).tournamentName("tournamentName1").description("description1").maxTeamsAllowed(1).prices("prices1");
    }

    public static Tournament getTournamentSample2() {
        return new Tournament().id(2L).tournamentName("tournamentName2").description("description2").maxTeamsAllowed(2).prices("prices2");
    }

    public static Tournament getTournamentRandomSampleGenerator() {
        return new Tournament()
            .id(longCount.incrementAndGet())
            .tournamentName(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .maxTeamsAllowed(intCount.incrementAndGet())
            .prices(UUID.randomUUID().toString());
    }
}
