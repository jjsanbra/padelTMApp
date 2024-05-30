import { IPlayer, NewPlayer } from './player.model';

export const sampleWithRequiredData: IPlayer = {
  id: 11678,
  firstName: 'María Elena',
  lastName: 'Lemus Borrego',
};

export const sampleWithPartialData: IPlayer = {
  id: 22585,
  firstName: 'María Elena',
  lastName: 'Adame Valles',
  phoneNumber: 'far-off',
  age: 51,
  category: 'M',
};

export const sampleWithFullData: IPlayer = {
  id: 14185,
  firstName: 'Homero',
  lastName: 'Borrego Alanis',
  phoneNumber: 'careful informal respire',
  age: 65,
  category: 'MIX',
  level: 'L45',
};

export const sampleWithNewData: NewPlayer = {
  firstName: 'Caridad',
  lastName: 'Balderas Estévez',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
