import { ITeam, NewTeam } from './team.model';

export const sampleWithRequiredData: ITeam = {
  id: 15724,
};

export const sampleWithPartialData: ITeam = {
  id: 31546,
  level: 'L0',
  category: 'M',
};

export const sampleWithFullData: ITeam = {
  id: 12981,
  teamName: 'partially',
  level: 'L25',
  category: 'F',
  logo: '../fake-data/blob/hipster.png',
  logoContentType: 'unknown',
};

export const sampleWithNewData: NewTeam = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
