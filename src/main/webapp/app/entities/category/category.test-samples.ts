import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 14415,
  categoryName: 'fondly quick',
};

export const sampleWithPartialData: ICategory = {
  id: 13991,
  categoryName: 'until aha',
};

export const sampleWithFullData: ICategory = {
  id: 5515,
  categoryName: 'value infect',
  description: 'yippee roughly',
};

export const sampleWithNewData: NewCategory = {
  categoryName: 'farm pressurization',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
