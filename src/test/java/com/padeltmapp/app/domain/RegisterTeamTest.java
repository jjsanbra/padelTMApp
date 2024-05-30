package com.padeltmapp.app.domain;

import static com.padeltmapp.app.domain.RegisterTeamTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RegisterTeamTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegisterTeam.class);
        RegisterTeam registerTeam1 = getRegisterTeamSample1();
        RegisterTeam registerTeam2 = new RegisterTeam();
        assertThat(registerTeam1).isNotEqualTo(registerTeam2);

        registerTeam2.setId(registerTeam1.getId());
        assertThat(registerTeam1).isEqualTo(registerTeam2);

        registerTeam2 = getRegisterTeamSample2();
        assertThat(registerTeam1).isNotEqualTo(registerTeam2);
    }
}
