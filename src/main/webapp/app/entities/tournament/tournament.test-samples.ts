import dayjs from 'dayjs/esm';

import { ITournament, NewTournament } from './tournament.model';

export const sampleWithRequiredData: ITournament = {
  id: 30880,
};

export const sampleWithPartialData: ITournament = {
  id: 11026,
  description: 'ingredient',
  endDate: dayjs('2024-05-29T22:42'),
  lastInscriptionsDate: dayjs('2024-05-30T08:12'),
  maxTeamsAllowed: 44,
  active: false,
};

export const sampleWithFullData: ITournament = {
  id: 18070,
  tournamentName: 'prophet',
  description: 'deliberately beautifully ha',
  startDate: dayjs('2024-05-30T01:09'),
  endDate: dayjs('2024-05-29T22:57'),
  lastInscriptionsDate: dayjs('2024-05-29T19:41'),
  maxTeamsAllowed: 25,
  prices: 'cripple whoa',
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
