import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 24441,
  countryName: 'unfinished',
};

export const sampleWithPartialData: ICountry = {
  id: 2798,
  countryName: 'rake in',
};

export const sampleWithFullData: ICountry = {
  id: 18562,
  countryName: 'but burro lest',
};

export const sampleWithNewData: NewCountry = {
  countryName: 'conditioner',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
