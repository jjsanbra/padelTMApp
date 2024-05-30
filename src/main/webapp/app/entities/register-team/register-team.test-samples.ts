import { IRegisterTeam, NewRegisterTeam } from './register-team.model';

export const sampleWithRequiredData: IRegisterTeam = {
  id: 30102,
  teamName: 'trailer juvenile off',
};

export const sampleWithPartialData: IRegisterTeam = {
  id: 11423,
  teamName: 'under fairly drat',
};

export const sampleWithFullData: IRegisterTeam = {
  id: 26882,
  teamName: 'dawdle oof',
};

export const sampleWithNewData: NewRegisterTeam = {
  teamName: 'spotted furthermore that',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
