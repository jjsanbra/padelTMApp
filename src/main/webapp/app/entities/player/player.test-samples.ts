import { IPlayer, NewPlayer } from './player.model';

export const sampleWithRequiredData: IPlayer = {
  id: 1851,
  firstName: 'Octavio',
  lastName: 'Collazo Lemus',
};

export const sampleWithPartialData: IPlayer = {
  id: 10786,
  firstName: 'Maricarmen',
  lastName: 'Salgado Chávez',
  phoneNumber: 'aha',
  age: 73,
  avatar: '../fake-data/blob/hipster.png',
  avatarContentType: 'unknown',
};

export const sampleWithFullData: IPlayer = {
  id: 8836,
  firstName: 'Claudia',
  lastName: 'Herrera Carbajal',
  phoneNumber: 'root er wonderfully',
  age: 23,
  avatar: '../fake-data/blob/hipster.png',
  avatarContentType: 'unknown',
};

export const sampleWithNewData: NewPlayer = {
  firstName: 'Ariadna',
  lastName: 'Robledo Rolón',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
