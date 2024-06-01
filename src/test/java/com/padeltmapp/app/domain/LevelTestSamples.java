package com.padeltmapp.app.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class LevelTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Level getLevelSample1() {
        return new Level().id(1L).levelName("levelName1").description("description1");
    }

    public static Level getLevelSample2() {
        return new Level().id(2L).levelName("levelName2").description("description2");
    }

    public static Level getLevelRandomSampleGenerator() {
        return new Level()
            .id(longCount.incrementAndGet())
            .levelName(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
