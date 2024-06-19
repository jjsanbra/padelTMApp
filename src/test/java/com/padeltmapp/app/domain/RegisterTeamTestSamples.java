package com.padeltmapp.app.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class RegisterTeamTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static RegisterTeam getRegisterTeamSample1() {
        return new RegisterTeam().id(1L);
    }

    public static RegisterTeam getRegisterTeamSample2() {
        return new RegisterTeam().id(2L);
    }

    public static RegisterTeam getRegisterTeamRandomSampleGenerator() {
        return new RegisterTeam().id(longCount.incrementAndGet());
    }
}
