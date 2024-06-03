import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../court-type.test-samples';

import { CourtTypeFormService } from './court-type-form.service';

describe('CourtType Form Service', () => {
  let service: CourtTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCourtTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCourtTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            courtTypeName: expect.any(Object),
            description: expect.any(Object),
            tournaments: expect.any(Object),
          }),
        );
      });

      it('passing ICourtType should create a new form with FormGroup', () => {
        const formGroup = service.createCourtTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            courtTypeName: expect.any(Object),
            description: expect.any(Object),
            tournaments: expect.any(Object),
          }),
        );
      });
    });

    describe('getCourtType', () => {
      it('should return NewCourtType for default CourtType initial value', () => {
        const formGroup = service.createCourtTypeFormGroup(sampleWithNewData);

        const courtType = service.getCourtType(formGroup) as any;

        expect(courtType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCourtType for empty CourtType initial value', () => {
        const formGroup = service.createCourtTypeFormGroup();

        const courtType = service.getCourtType(formGroup) as any;

        expect(courtType).toMatchObject({});
      });

      it('should return ICourtType', () => {
        const formGroup = service.createCourtTypeFormGroup(sampleWithRequiredData);

        const courtType = service.getCourtType(formGroup) as any;

        expect(courtType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICourtType should not enable id FormControl', () => {
        const formGroup = service.createCourtTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCourtType should disable id FormControl', () => {
        const formGroup = service.createCourtTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
