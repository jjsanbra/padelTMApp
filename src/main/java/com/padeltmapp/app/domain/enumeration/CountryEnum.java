package com.padeltmapp.app.domain.enumeration;

/**
 * The CountryEnum enumeration.
 */
public enum CountryEnum {
    FR("Francia"),
    PT("Portugal"),
    ES("España");

    private final String value;

    CountryEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
