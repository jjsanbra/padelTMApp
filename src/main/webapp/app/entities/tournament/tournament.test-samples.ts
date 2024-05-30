import dayjs from 'dayjs/esm';

import { ITournament, NewTournament } from './tournament.model';

export const sampleWithRequiredData: ITournament = {
  id: 1343,
};

export const sampleWithPartialData: ITournament = {
  id: 77,
  description: 'quarrelsomely unless wherever',
  startDate: dayjs('2024-05-30T06:49'),
  endDate: dayjs('2024-05-30T09:55'),
  endTime: dayjs('2024-05-30T08:20'),
  limitPax: 19170,
  prices: 'among mid and',
  poster: '../fake-data/blob/hipster.png',
  posterContentType: 'unknown',
};

export const sampleWithFullData: ITournament = {
  id: 24189,
  tournamentName: 'under',
  description: 'wherever',
  startDate: dayjs('2024-05-29T16:02'),
  endDate: dayjs('2024-05-29T18:34'),
  startTime: dayjs('2024-05-30T04:55'),
  endTime: dayjs('2024-05-30T09:24'),
  lastInscriptionsDate: dayjs('2024-05-30T04:39'),
  limitPax: 1612,
  prices: 'moist which underneath',
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
