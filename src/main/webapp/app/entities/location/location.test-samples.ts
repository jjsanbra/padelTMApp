import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 7609,
};

export const sampleWithPartialData: ILocation = {
  id: 26619,
  city: 'Zamora',
  stateProvince: 'adventurous protect loan',
};

export const sampleWithFullData: ILocation = {
  id: 18682,
  streetAddress: 'after gah',
  postalCode: 'sticky via',
  city: 'Chiclana de la Frontera',
  stateProvince: 'forum yearly blah',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
