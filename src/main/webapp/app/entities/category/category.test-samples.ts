import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 14415,
  categoryName: 'M',
};

export const sampleWithPartialData: ICategory = {
  id: 14520,
  categoryName: 'MIX',
  description: 'that veto',
};

export const sampleWithFullData: ICategory = {
  id: 27529,
  categoryName: 'MIX',
  description: 'adventurously',
};

export const sampleWithNewData: NewCategory = {
  categoryName: 'M',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
