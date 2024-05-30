package com.padeltmapp.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SponsorTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Sponsor getSponsorSample1() {
        return new Sponsor().id(1L).sponsorName("sponsorName1").description("description1");
    }

    public static Sponsor getSponsorSample2() {
        return new Sponsor().id(2L).sponsorName("sponsorName2").description("description2");
    }

    public static Sponsor getSponsorRandomSampleGenerator() {
        return new Sponsor()
            .id(longCount.incrementAndGet())
            .sponsorName(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
