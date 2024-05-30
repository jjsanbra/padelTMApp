import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPlayer, NewPlayer } from '../player.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlayer for edit and NewPlayerFormGroupInput for create.
 */
type PlayerFormGroupInput = IPlayer | PartialWithRequiredKeyOf<NewPlayer>;

type PlayerFormDefaults = Pick<NewPlayer, 'id' | 'categories' | 'teams'>;

type PlayerFormGroupContent = {
  id: FormControl<IPlayer['id'] | NewPlayer['id']>;
  firstName: FormControl<IPlayer['firstName']>;
  lastName: FormControl<IPlayer['lastName']>;
  phoneNumber: FormControl<IPlayer['phoneNumber']>;
  age: FormControl<IPlayer['age']>;
  category: FormControl<IPlayer['category']>;
  level: FormControl<IPlayer['level']>;
  avatar: FormControl<IPlayer['avatar']>;
  avatarContentType: FormControl<IPlayer['avatarContentType']>;
  categories: FormControl<IPlayer['categories']>;
  teams: FormControl<IPlayer['teams']>;
};

export type PlayerFormGroup = FormGroup<PlayerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlayerFormService {
  createPlayerFormGroup(player: PlayerFormGroupInput = { id: null }): PlayerFormGroup {
    const playerRawValue = {
      ...this.getFormDefaults(),
      ...player,
    };
    return new FormGroup<PlayerFormGroupContent>({
      id: new FormControl(
        { value: playerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      firstName: new FormControl(playerRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(playerRawValue.lastName, {
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl(playerRawValue.phoneNumber),
      age: new FormControl(playerRawValue.age, {
        validators: [Validators.min(12), Validators.max(80)],
      }),
      category: new FormControl(playerRawValue.category),
      level: new FormControl(playerRawValue.level),
      avatar: new FormControl(playerRawValue.avatar),
      avatarContentType: new FormControl(playerRawValue.avatarContentType),
      categories: new FormControl(playerRawValue.categories ?? []),
      teams: new FormControl(playerRawValue.teams ?? []),
    });
  }

  getPlayer(form: PlayerFormGroup): IPlayer | NewPlayer {
    return form.getRawValue() as IPlayer | NewPlayer;
  }

  resetForm(form: PlayerFormGroup, player: PlayerFormGroupInput): void {
    const playerRawValue = { ...this.getFormDefaults(), ...player };
    form.reset(
      {
        ...playerRawValue,
        id: { value: playerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PlayerFormDefaults {
    return {
      id: null,
      categories: [],
      teams: [],
    };
  }
}
