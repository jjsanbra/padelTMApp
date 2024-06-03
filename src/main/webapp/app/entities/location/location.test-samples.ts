import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 31418,
};

export const sampleWithPartialData: ILocation = {
  id: 10279,
  streetAddress: 'geez',
  postalCode: 'avaricious known',
};

export const sampleWithFullData: ILocation = {
  id: 5803,
  streetAddress: 'although latch mmm',
  postalCode: 'brr pro',
  city: 'Gandía',
  stateProvince: 'so whereas',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
