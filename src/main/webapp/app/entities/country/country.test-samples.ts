import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 24441,
  countryName: 'FR',
};

export const sampleWithPartialData: ICountry = {
  id: 16608,
  countryName: 'FR',
};

export const sampleWithFullData: ICountry = {
  id: 25072,
  countryName: 'PT',
};

export const sampleWithNewData: NewCountry = {
  countryName: 'PT',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
