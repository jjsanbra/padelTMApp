import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 14520,
  categoryName: 'pish aha until',
};

export const sampleWithPartialData: ICategory = {
  id: 24206,
  categoryName: 'yet download',
};

export const sampleWithFullData: ICategory = {
  id: 20401,
  categoryName: 'wherever',
  description: 'sans weak although',
};

export const sampleWithNewData: NewCategory = {
  categoryName: 'above parrot exfoliate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
