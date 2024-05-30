import { ISponsor, NewSponsor } from './sponsor.model';

export const sampleWithRequiredData: ISponsor = {
  id: 6486,
  sponsorName: 'blot',
};

export const sampleWithPartialData: ISponsor = {
  id: 18795,
  sponsorName: 'unfortunately drat',
  description: 'whereas barring',
};

export const sampleWithFullData: ISponsor = {
  id: 31206,
  sponsorName: 'ha gadzooks',
  description: 'clutch',
  logo: '../fake-data/blob/hipster.png',
  logoContentType: 'unknown',
};

export const sampleWithNewData: NewSponsor = {
  sponsorName: 'cruelly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
