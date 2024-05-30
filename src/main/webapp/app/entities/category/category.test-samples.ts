import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 14906,
  categoryName: 'M',
};

export const sampleWithPartialData: ICategory = {
  id: 14415,
  categoryName: 'M',
  description: 'yearningly',
};

export const sampleWithFullData: ICategory = {
  id: 7604,
  categoryName: 'MIX',
  description: 'veto phew',
};

export const sampleWithNewData: NewCategory = {
  categoryName: 'MIX',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
