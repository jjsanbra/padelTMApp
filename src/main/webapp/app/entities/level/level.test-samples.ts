import { ILevel, NewLevel } from './level.model';

export const sampleWithRequiredData: ILevel = {
  id: 30355,
  levelName: 'circle',
};

export const sampleWithPartialData: ILevel = {
  id: 16774,
  levelName: 'who',
  description: 'bah',
};

export const sampleWithFullData: ILevel = {
  id: 25229,
  levelName: 'meat fruitful wetly',
  description: 'ha',
};

export const sampleWithNewData: NewLevel = {
  levelName: 'whoever aw even',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
