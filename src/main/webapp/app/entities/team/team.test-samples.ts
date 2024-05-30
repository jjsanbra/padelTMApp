import { ITeam, NewTeam } from './team.model';

export const sampleWithRequiredData: ITeam = {
  id: 18140,
};

export const sampleWithPartialData: ITeam = {
  id: 169,
  teamName: 'aw consequently whoever',
  category: 'F',
};

export const sampleWithFullData: ITeam = {
  id: 20378,
  teamName: 'far judgementally warmly',
  level: 'L2',
  category: 'MIX',
};

export const sampleWithNewData: NewTeam = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
