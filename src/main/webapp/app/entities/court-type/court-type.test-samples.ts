import { ICourtType, NewCourtType } from './court-type.model';

export const sampleWithRequiredData: ICourtType = {
  id: 21553,
  courtTypeName: 'fatal whoever great',
};

export const sampleWithPartialData: ICourtType = {
  id: 15842,
  courtTypeName: 'bravely pall gee',
};

export const sampleWithFullData: ICourtType = {
  id: 18859,
  courtTypeName: 'stealthily oof',
  description: 'grandson swig truly',
};

export const sampleWithNewData: NewCourtType = {
  courtTypeName: 'save think',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
