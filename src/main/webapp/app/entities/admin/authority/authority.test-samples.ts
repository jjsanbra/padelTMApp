import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '16802352-339c-4a33-94d2-db90b809bc8b',
};

export const sampleWithPartialData: IAuthority = {
  name: '532e5566-b138-4d19-9238-a23ebc9cd9f6',
};

export const sampleWithFullData: IAuthority = {
  name: 'fd64f0ee-88f3-42cb-9ede-0baa626e5a9b',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
