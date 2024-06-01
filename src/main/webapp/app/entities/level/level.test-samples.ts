import { ILevel, NewLevel } from './level.model';

export const sampleWithRequiredData: ILevel = {
  id: 24725,
  levelName: 'incidentally nearly ornery',
};

export const sampleWithPartialData: ILevel = {
  id: 19459,
  levelName: 'throughout',
  description: 'phooey',
};

export const sampleWithFullData: ILevel = {
  id: 15672,
  levelName: 'reliable management',
  description: 'on fruitful',
};

export const sampleWithNewData: NewLevel = {
  levelName: 'closely overhead begrudge',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
