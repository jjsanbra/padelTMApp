package com.padeltmapp.app.domain.enumeration;

/**
 * The LevelEnum enumeration.
 */
public enum LevelEnum {
    L0("0 - Iniciación"),
    L05("0.5 - Iniciación"),
    L1("1 - Iniciación"),
    L15("1.5 - Iniciación Intermedio"),
    L2("2 - Iniciación Intermedio"),
    L25("2.5 - Intermedio"),
    L3("3 - Intermedio"),
    L35("3.5 - Intermedio"),
    L4("4 - Intermedio Alto"),
    L45("4.5 - Intermedio Alto"),
    L5("5 - Alto Avanzado"),
    L55("5.5 - Avanzado"),
    L6("6 - Avanzado"),
    L7("7 - Élite");

    private final String value;

    LevelEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
