package com.padeltmapp.app.domain.enumeration;

/**
 * The CategoryEnum enumeration.
 */
public enum CategoryEnum {
    F("Femenino"),
    M("Masculino"),
    MIX("Mixto");

    private final String value;

    CategoryEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
