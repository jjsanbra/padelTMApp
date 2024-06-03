import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 21823,
  countryName: 'summer embitter',
};

export const sampleWithPartialData: ICountry = {
  id: 15238,
  countryName: 'yet furthermore',
};

export const sampleWithFullData: ICountry = {
  id: 9596,
  countryName: 'demur pushy',
};

export const sampleWithNewData: NewCountry = {
  countryName: 'eek',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
