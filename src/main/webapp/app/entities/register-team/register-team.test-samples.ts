import { IRegisterTeam, NewRegisterTeam } from './register-team.model';

export const sampleWithRequiredData: IRegisterTeam = {
  id: 14019,
  teamName: 'versus hinder even',
};

export const sampleWithPartialData: IRegisterTeam = {
  id: 20096,
  teamName: 'grandiose smash lest',
};

export const sampleWithFullData: IRegisterTeam = {
  id: 2809,
  teamName: 'zowie excavate',
};

export const sampleWithNewData: NewRegisterTeam = {
  teamName: 'major',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
