import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITeam, NewTeam } from '../team.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeam for edit and NewTeamFormGroupInput for create.
 */
type TeamFormGroupInput = ITeam | PartialWithRequiredKeyOf<NewTeam>;

type TeamFormDefaults = Pick<NewTeam, 'id' | 'players' | 'tournaments'>;

type TeamFormGroupContent = {
  id: FormControl<ITeam['id'] | NewTeam['id']>;
  teamName: FormControl<ITeam['teamName']>;
  logo: FormControl<ITeam['logo']>;
  logoContentType: FormControl<ITeam['logoContentType']>;
  level: FormControl<ITeam['level']>;
  category: FormControl<ITeam['category']>;
  players: FormControl<ITeam['players']>;
  tournaments: FormControl<ITeam['tournaments']>;
};

export type TeamFormGroup = FormGroup<TeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeamFormService {
  createTeamFormGroup(team: TeamFormGroupInput = { id: null }): TeamFormGroup {
    const teamRawValue = {
      ...this.getFormDefaults(),
      ...team,
    };
    return new FormGroup<TeamFormGroupContent>({
      id: new FormControl(
        { value: teamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      teamName: new FormControl(teamRawValue.teamName),
      logo: new FormControl(teamRawValue.logo),
      logoContentType: new FormControl(teamRawValue.logoContentType),
      level: new FormControl(teamRawValue.level),
      category: new FormControl(teamRawValue.category),
      players: new FormControl(teamRawValue.players ?? []),
      tournaments: new FormControl(teamRawValue.tournaments ?? []),
    });
  }

  getTeam(form: TeamFormGroup): ITeam | NewTeam {
    return form.getRawValue() as ITeam | NewTeam;
  }

  resetForm(form: TeamFormGroup, team: TeamFormGroupInput): void {
    const teamRawValue = { ...this.getFormDefaults(), ...team };
    form.reset(
      {
        ...teamRawValue,
        id: { value: teamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TeamFormDefaults {
    return {
      id: null,
      players: [],
      tournaments: [],
    };
  }
}
