import dayjs from 'dayjs/esm';

import { IRegisterTeam, NewRegisterTeam } from './register-team.model';

export const sampleWithRequiredData: IRegisterTeam = {
  id: 13529,
  registerDate: dayjs('2024-06-02T22:00'),
};

export const sampleWithPartialData: IRegisterTeam = {
  id: 1459,
  registerDate: dayjs('2024-06-03T09:37'),
};

export const sampleWithFullData: IRegisterTeam = {
  id: 18809,
  registerDate: dayjs('2024-06-02T15:51'),
};

export const sampleWithNewData: NewRegisterTeam = {
  registerDate: dayjs('2024-06-03T03:16'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
