import dayjs from 'dayjs/esm';

import { ITournament, NewTournament } from './tournament.model';

export const sampleWithRequiredData: ITournament = {
  id: 3512,
};

export const sampleWithPartialData: ITournament = {
  id: 10616,
  description: 'safely',
  startDate: dayjs('2024-06-02T19:08'),
  poster: '../fake-data/blob/hipster.png',
  posterContentType: 'unknown',
};

export const sampleWithFullData: ITournament = {
  id: 3353,
  tournamentName: 'roller baggy ugh',
  description: 'nix venison amongst',
  startDate: dayjs('2024-06-02T17:36'),
  endDate: dayjs('2024-06-03T07:34'),
  lastInscriptionsDate: dayjs('2024-06-02T20:01'),
  maxTeamsAllowed: 73,
  prices: 'buckwheat',
  active: false,
  poster: '../fake-data/blob/hipster.png',
  posterContentType: 'unknown',
};

export const sampleWithNewData: NewTournament = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
