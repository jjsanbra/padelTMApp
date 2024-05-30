package com.padeltmapp.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RegisterTeamDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegisterTeamDTO.class);
        RegisterTeamDTO registerTeamDTO1 = new RegisterTeamDTO();
        registerTeamDTO1.setId(1L);
        RegisterTeamDTO registerTeamDTO2 = new RegisterTeamDTO();
        assertThat(registerTeamDTO1).isNotEqualTo(registerTeamDTO2);
        registerTeamDTO2.setId(registerTeamDTO1.getId());
        assertThat(registerTeamDTO1).isEqualTo(registerTeamDTO2);
        registerTeamDTO2.setId(2L);
        assertThat(registerTeamDTO1).isNotEqualTo(registerTeamDTO2);
        registerTeamDTO1.setId(null);
        assertThat(registerTeamDTO1).isNotEqualTo(registerTeamDTO2);
    }
}
