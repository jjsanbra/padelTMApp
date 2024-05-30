import { ISponsor, NewSponsor } from './sponsor.model';

export const sampleWithRequiredData: ISponsor = {
  id: 13350,
  sponsorName: 'afore',
};

export const sampleWithPartialData: ISponsor = {
  id: 8777,
  sponsorName: 'easily er',
  description: 'councilor agile',
};

export const sampleWithFullData: ISponsor = {
  id: 22675,
  sponsorName: 'before',
  description: 'taint accurate',
};

export const sampleWithNewData: NewSponsor = {
  sponsorName: 'aboard crew',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
