import { ISponsor, NewSponsor } from './sponsor.model';

export const sampleWithRequiredData: ISponsor = {
  id: 28352,
  sponsorName: 'untimely',
};

export const sampleWithPartialData: ISponsor = {
  id: 29741,
  sponsorName: 'ah against ack',
  logo: '../fake-data/blob/hipster.png',
  logoContentType: 'unknown',
};

export const sampleWithFullData: ISponsor = {
  id: 2079,
  sponsorName: 'or times piercing',
  description: 'sadly gray',
  logo: '../fake-data/blob/hipster.png',
  logoContentType: 'unknown',
};

export const sampleWithNewData: NewSponsor = {
  sponsorName: 'unbearably possess',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
