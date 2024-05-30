import { ILevel, NewLevel } from './level.model';

export const sampleWithRequiredData: ILevel = {
  id: 21078,
  levelName: 'L7',
};

export const sampleWithPartialData: ILevel = {
  id: 30808,
  levelName: 'L6',
};

export const sampleWithFullData: ILevel = {
  id: 23123,
  levelName: 'L5',
  description: 'incidentally nearly ornery',
};

export const sampleWithNewData: NewLevel = {
  levelName: 'L1',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
