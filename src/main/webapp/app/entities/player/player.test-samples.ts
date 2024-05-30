import { IPlayer, NewPlayer } from './player.model';

export const sampleWithRequiredData: IPlayer = {
  id: 26901,
  firstName: 'José Emilio',
  lastName: 'Borrego Barrientos',
};

export const sampleWithPartialData: IPlayer = {
  id: 8084,
  firstName: 'Alberto',
  lastName: 'Alonzo Cazares',
  phoneNumber: 'overflow yet irritably',
  age: 69,
};

export const sampleWithFullData: IPlayer = {
  id: 13161,
  firstName: 'Rocío',
  lastName: 'Tapia Hinojosa',
  phoneNumber: 'phew extremely in',
  age: 50,
  category: 'M',
  level: 'L0',
  avatar: '../fake-data/blob/hipster.png',
  avatarContentType: 'unknown',
};

export const sampleWithNewData: NewPlayer = {
  firstName: 'Soledad',
  lastName: 'Maya Matos',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
