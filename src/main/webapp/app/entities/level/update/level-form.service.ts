import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILevel, NewLevel } from '../level.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILevel for edit and NewLevelFormGroupInput for create.
 */
type LevelFormGroupInput = ILevel | PartialWithRequiredKeyOf<NewLevel>;

type LevelFormDefaults = Pick<NewLevel, 'id' | 'tournaments'>;

type LevelFormGroupContent = {
  id: FormControl<ILevel['id'] | NewLevel['id']>;
  levelName: FormControl<ILevel['levelName']>;
  description: FormControl<ILevel['description']>;
  tournaments: FormControl<ILevel['tournaments']>;
};

export type LevelFormGroup = FormGroup<LevelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LevelFormService {
  createLevelFormGroup(level: LevelFormGroupInput = { id: null }): LevelFormGroup {
    const levelRawValue = {
      ...this.getFormDefaults(),
      ...level,
    };
    return new FormGroup<LevelFormGroupContent>({
      id: new FormControl(
        { value: levelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      levelName: new FormControl(levelRawValue.levelName, {
        validators: [Validators.required],
      }),
      description: new FormControl(levelRawValue.description),
      tournaments: new FormControl(levelRawValue.tournaments ?? []),
    });
  }

  getLevel(form: LevelFormGroup): ILevel | NewLevel {
    return form.getRawValue() as ILevel | NewLevel;
  }

  resetForm(form: LevelFormGroup, level: LevelFormGroupInput): void {
    const levelRawValue = { ...this.getFormDefaults(), ...level };
    form.reset(
      {
        ...levelRawValue,
        id: { value: levelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LevelFormDefaults {
    return {
      id: null,
      tournaments: [],
    };
  }
}
