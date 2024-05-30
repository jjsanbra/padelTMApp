import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRegisterTeam, NewRegisterTeam } from '../register-team.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRegisterTeam for edit and NewRegisterTeamFormGroupInput for create.
 */
type RegisterTeamFormGroupInput = IRegisterTeam | PartialWithRequiredKeyOf<NewRegisterTeam>;

type RegisterTeamFormDefaults = Pick<NewRegisterTeam, 'id'>;

type RegisterTeamFormGroupContent = {
  id: FormControl<IRegisterTeam['id'] | NewRegisterTeam['id']>;
  teamName: FormControl<IRegisterTeam['teamName']>;
};

export type RegisterTeamFormGroup = FormGroup<RegisterTeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RegisterTeamFormService {
  createRegisterTeamFormGroup(registerTeam: RegisterTeamFormGroupInput = { id: null }): RegisterTeamFormGroup {
    const registerTeamRawValue = {
      ...this.getFormDefaults(),
      ...registerTeam,
    };
    return new FormGroup<RegisterTeamFormGroupContent>({
      id: new FormControl(
        { value: registerTeamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      teamName: new FormControl(registerTeamRawValue.teamName, {
        validators: [Validators.required],
      }),
    });
  }

  getRegisterTeam(form: RegisterTeamFormGroup): IRegisterTeam | NewRegisterTeam {
    return form.getRawValue() as IRegisterTeam | NewRegisterTeam;
  }

  resetForm(form: RegisterTeamFormGroup, registerTeam: RegisterTeamFormGroupInput): void {
    const registerTeamRawValue = { ...this.getFormDefaults(), ...registerTeam };
    form.reset(
      {
        ...registerTeamRawValue,
        id: { value: registerTeamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RegisterTeamFormDefaults {
    return {
      id: null,
    };
  }
}
