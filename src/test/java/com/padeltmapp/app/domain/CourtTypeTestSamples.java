package com.padeltmapp.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CourtTypeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CourtType getCourtTypeSample1() {
        return new CourtType().id(1L).courtTypeName("courtTypeName1").description("description1");
    }

    public static CourtType getCourtTypeSample2() {
        return new CourtType().id(2L).courtTypeName("courtTypeName2").description("description2");
    }

    public static CourtType getCourtTypeRandomSampleGenerator() {
        return new CourtType()
            .id(longCount.incrementAndGet())
            .courtTypeName(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
