import { IPlayer, NewPlayer } from './player.model';

export const sampleWithRequiredData: IPlayer = {
  id: 8324,
  userName: 'throughout so',
  password: 'boohoo kilt',
  firstName: 'Lilia',
  lastName: 'Zelaya Baeza',
  email: 'MariaSoledad85@yahoo.com',
};

export const sampleWithPartialData: IPlayer = {
  id: 5349,
  userName: 'celebrated oh',
  password: 'lest gap above',
  firstName: 'Lucas',
  lastName: 'Godínez Vela',
  email: 'Bernardo.AlfaroTejeda48@hotmail.com',
  age: 61,
};

export const sampleWithFullData: IPlayer = {
  id: 28105,
  userName: 'ugh ouch furiously',
  password: 'into',
  firstName: 'Dolores',
  lastName: 'Vega Quiñones',
  email: 'Horacio39@hotmail.com',
  phoneNumber: 'offensively employ frightfully',
  age: 62,
  avatar: '../fake-data/blob/hipster.png',
  avatarContentType: 'unknown',
};

export const sampleWithNewData: NewPlayer = {
  userName: 'ouch duplicate who',
  password: 'per quirky starry',
  firstName: 'Vicente',
  lastName: 'Ordóñez Merino',
  email: 'Estela_MascarenasMartinez@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
