package com.padeltmapp.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class PlayerTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Player getPlayerSample1() {
        return new Player().id(1L).firstName("firstName1").lastName("lastName1").phoneNumber("phoneNumber1").age(1);
    }

    public static Player getPlayerSample2() {
        return new Player().id(2L).firstName("firstName2").lastName("lastName2").phoneNumber("phoneNumber2").age(2);
    }

    public static Player getPlayerRandomSampleGenerator() {
        return new Player()
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .phoneNumber(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet());
    }
}
