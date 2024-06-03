import { IPlayer, NewPlayer } from './player.model';

export const sampleWithRequiredData: IPlayer = {
  id: 26941,
  userName: 'intone um',
  password: 'across what',
  firstName: 'David',
  lastName: 'Galván Valdivia',
  email: 'Ignacio42@yahoo.com',
};

export const sampleWithPartialData: IPlayer = {
  id: 412,
  userName: 'panic gadzooks vivaciously',
  password: 'president dial near',
  firstName: 'Agustín',
  lastName: 'Sánchez Almonte',
  email: 'Eduardo_CerdaDelapaz@yahoo.com',
  phoneNumber: 'founder uh-huh',
  age: 69,
  avatar: '../fake-data/blob/hipster.png',
  avatarContentType: 'unknown',
};

export const sampleWithFullData: IPlayer = {
  id: 19888,
  userName: 'blah',
  password: 'likewise inside quarrelsomely',
  firstName: 'Gregorio',
  lastName: 'Espinoza Valle',
  email: 'Rosalia_AliceaHenriquez@hotmail.com',
  phoneNumber: 'boo rehearse hometown',
  age: 62,
  avatar: '../fake-data/blob/hipster.png',
  avatarContentType: 'unknown',
};

export const sampleWithNewData: NewPlayer = {
  userName: 'sore',
  password: 'feline once',
  firstName: 'Amalia',
  lastName: 'Canales Solís',
  email: 'Gonzalo.RivasVerdugo32@gmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
