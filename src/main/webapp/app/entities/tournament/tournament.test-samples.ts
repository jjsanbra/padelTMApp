import dayjs from 'dayjs/esm';

import { ITournament, NewTournament } from './tournament.model';

export const sampleWithRequiredData: ITournament = {
  id: 31866,
};

export const sampleWithPartialData: ITournament = {
  id: 16712,
  tournamentName: 'construe',
  startDate: dayjs('2024-05-30T04:04'),
  endDate: dayjs('2024-05-29T21:39'),
  startTime: dayjs('2024-05-29T23:08'),
  lastInscriptionsDate: dayjs('2024-05-30T08:47'),
  prices: 'region',
  active: true,
};

export const sampleWithFullData: ITournament = {
  id: 1949,
  tournamentName: 'ha burst',
  description: 'delicious disposer',
  startDate: dayjs('2024-05-30T07:43'),
  endDate: dayjs('2024-05-30T03:23'),
  startTime: dayjs('2024-05-29T18:03'),
  endTime: dayjs('2024-05-29T13:03'),
  lastInscriptionsDate: dayjs('2024-05-30T08:39'),
  limitPax: 27112,
  prices: 'next astrakhan sleepily',
  active: false,
};

export const sampleWithNewData: NewTournament = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
