import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 7077,
  login: '^MPW`j@BUKk5\\-nUR73\\.BejJ\\zD\\30\\!dx',
};

export const sampleWithPartialData: IUser = {
  id: 3219,
  login: '8',
};

export const sampleWithFullData: IUser = {
  id: 5113,
  login: 'Mug@O\\[q\\&xS\\?HBs',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
