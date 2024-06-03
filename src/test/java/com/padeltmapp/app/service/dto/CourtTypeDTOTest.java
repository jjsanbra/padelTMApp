package com.padeltmapp.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.padeltmapp.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CourtTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourtTypeDTO.class);
        CourtTypeDTO courtTypeDTO1 = new CourtTypeDTO();
        courtTypeDTO1.setId(1L);
        CourtTypeDTO courtTypeDTO2 = new CourtTypeDTO();
        assertThat(courtTypeDTO1).isNotEqualTo(courtTypeDTO2);
        courtTypeDTO2.setId(courtTypeDTO1.getId());
        assertThat(courtTypeDTO1).isEqualTo(courtTypeDTO2);
        courtTypeDTO2.setId(2L);
        assertThat(courtTypeDTO1).isNotEqualTo(courtTypeDTO2);
        courtTypeDTO1.setId(null);
        assertThat(courtTypeDTO1).isNotEqualTo(courtTypeDTO2);
    }
}
