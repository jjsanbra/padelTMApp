import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
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

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IRegisterTeam | NewRegisterTeam> = Omit<T, 'registerDate'> & {
  registerDate?: string | null;
};

type RegisterTeamFormRawValue = FormValueOf<IRegisterTeam>;

type NewRegisterTeamFormRawValue = FormValueOf<NewRegisterTeam>;

type RegisterTeamFormDefaults = Pick<NewRegisterTeam, 'id' | 'registerDate' | 'tournaments'>;

type RegisterTeamFormGroupContent = {
  id: FormControl<RegisterTeamFormRawValue['id'] | NewRegisterTeam['id']>;
  registerDate: FormControl<RegisterTeamFormRawValue['registerDate']>;
  team: FormControl<RegisterTeamFormRawValue['team']>;
  tournaments: FormControl<RegisterTeamFormRawValue['tournaments']>;
};

export type RegisterTeamFormGroup = FormGroup<RegisterTeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RegisterTeamFormService {
  createRegisterTeamFormGroup(registerTeam: RegisterTeamFormGroupInput = { id: null }): RegisterTeamFormGroup {
    const registerTeamRawValue = this.convertRegisterTeamToRegisterTeamRawValue({
      ...this.getFormDefaults(),
      ...registerTeam,
    });
    return new FormGroup<RegisterTeamFormGroupContent>({
      id: new FormControl(
        { value: registerTeamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      registerDate: new FormControl(registerTeamRawValue.registerDate, {
        validators: [Validators.required],
      }),
      team: new FormControl(registerTeamRawValue.team, {
        validators: [Validators.required],
      }),
      tournaments: new FormControl(registerTeamRawValue.tournaments ?? []),
    });
  }

  getRegisterTeam(form: RegisterTeamFormGroup): IRegisterTeam | NewRegisterTeam {
    return this.convertRegisterTeamRawValueToRegisterTeam(form.getRawValue() as RegisterTeamFormRawValue | NewRegisterTeamFormRawValue);
  }

  resetForm(form: RegisterTeamFormGroup, registerTeam: RegisterTeamFormGroupInput): void {
    const registerTeamRawValue = this.convertRegisterTeamToRegisterTeamRawValue({ ...this.getFormDefaults(), ...registerTeam });
    form.reset(
      {
        ...registerTeamRawValue,
        id: { value: registerTeamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RegisterTeamFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      registerDate: currentTime,
      tournaments: [],
    };
  }

  private convertRegisterTeamRawValueToRegisterTeam(
    rawRegisterTeam: RegisterTeamFormRawValue | NewRegisterTeamFormRawValue,
  ): IRegisterTeam | NewRegisterTeam {
    return {
      ...rawRegisterTeam,
      registerDate: dayjs(rawRegisterTeam.registerDate, DATE_TIME_FORMAT),
    };
  }

  private convertRegisterTeamToRegisterTeamRawValue(
    registerTeam: IRegisterTeam | (Partial<NewRegisterTeam> & RegisterTeamFormDefaults),
  ): RegisterTeamFormRawValue | PartialWithRequiredKeyOf<NewRegisterTeamFormRawValue> {
    return {
      ...registerTeam,
      registerDate: registerTeam.registerDate ? registerTeam.registerDate.format(DATE_TIME_FORMAT) : undefined,
      tournaments: registerTeam.tournaments ?? [],
    };
  }
}
