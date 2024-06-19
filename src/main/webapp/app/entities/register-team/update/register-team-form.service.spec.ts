import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../register-team.test-samples';

import { RegisterTeamFormService } from './register-team-form.service';

describe('RegisterTeam Form Service', () => {
  let service: RegisterTeamFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterTeamFormService);
  });

  describe('Service methods', () => {
    describe('createRegisterTeamFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRegisterTeamFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            registerDate: expect.any(Object),
            team: expect.any(Object),
            tournaments: expect.any(Object),
          }),
        );
      });

      it('passing IRegisterTeam should create a new form with FormGroup', () => {
        const formGroup = service.createRegisterTeamFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            registerDate: expect.any(Object),
            team: expect.any(Object),
            tournaments: expect.any(Object),
          }),
        );
      });
    });

    describe('getRegisterTeam', () => {
      it('should return NewRegisterTeam for default RegisterTeam initial value', () => {
        const formGroup = service.createRegisterTeamFormGroup(sampleWithNewData);

        const registerTeam = service.getRegisterTeam(formGroup) as any;

        expect(registerTeam).toMatchObject(sampleWithNewData);
      });

      it('should return NewRegisterTeam for empty RegisterTeam initial value', () => {
        const formGroup = service.createRegisterTeamFormGroup();

        const registerTeam = service.getRegisterTeam(formGroup) as any;

        expect(registerTeam).toMatchObject({});
      });

      it('should return IRegisterTeam', () => {
        const formGroup = service.createRegisterTeamFormGroup(sampleWithRequiredData);

        const registerTeam = service.getRegisterTeam(formGroup) as any;

        expect(registerTeam).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRegisterTeam should not enable id FormControl', () => {
        const formGroup = service.createRegisterTeamFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRegisterTeam should disable id FormControl', () => {
        const formGroup = service.createRegisterTeamFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
