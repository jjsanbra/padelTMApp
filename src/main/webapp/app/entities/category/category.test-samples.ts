import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 20592,
  categoryName: 'human woot',
};

export const sampleWithPartialData: ICategory = {
  id: 12884,
  categoryName: 'consequently for',
  description: 'as',
};

export const sampleWithFullData: ICategory = {
  id: 31421,
  categoryName: 'gadzooks',
  description: 'jettison',
};

export const sampleWithNewData: NewCategory = {
  categoryName: 'levy jailhouse amid',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
