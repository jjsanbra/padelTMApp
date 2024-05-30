import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITournament, NewTournament } from '../tournament.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITournament for edit and NewTournamentFormGroupInput for create.
 */
type TournamentFormGroupInput = ITournament | PartialWithRequiredKeyOf<NewTournament>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITournament | NewTournament> = Omit<
  T,
  'startDate' | 'endDate' | 'startTime' | 'endTime' | 'lastInscriptionsDate'
> & {
  startDate?: string | null;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  lastInscriptionsDate?: string | null;
};

type TournamentFormRawValue = FormValueOf<ITournament>;

type NewTournamentFormRawValue = FormValueOf<NewTournament>;

type TournamentFormDefaults = Pick<
  NewTournament,
  | 'id'
  | 'startDate'
  | 'endDate'
  | 'startTime'
  | 'endTime'
  | 'lastInscriptionsDate'
  | 'active'
  | 'sponsors'
  | 'teams'
  | 'categories'
  | 'levels'
>;

type TournamentFormGroupContent = {
  id: FormControl<TournamentFormRawValue['id'] | NewTournament['id']>;
  tournamentName: FormControl<TournamentFormRawValue['tournamentName']>;
  description: FormControl<TournamentFormRawValue['description']>;
  startDate: FormControl<TournamentFormRawValue['startDate']>;
  endDate: FormControl<TournamentFormRawValue['endDate']>;
  startTime: FormControl<TournamentFormRawValue['startTime']>;
  endTime: FormControl<TournamentFormRawValue['endTime']>;
  lastInscriptionsDate: FormControl<TournamentFormRawValue['lastInscriptionsDate']>;
  limitPax: FormControl<TournamentFormRawValue['limitPax']>;
  prices: FormControl<TournamentFormRawValue['prices']>;
  active: FormControl<TournamentFormRawValue['active']>;
  location: FormControl<TournamentFormRawValue['location']>;
  sponsors: FormControl<TournamentFormRawValue['sponsors']>;
  teams: FormControl<TournamentFormRawValue['teams']>;
  categories: FormControl<TournamentFormRawValue['categories']>;
  levels: FormControl<TournamentFormRawValue['levels']>;
};

export type TournamentFormGroup = FormGroup<TournamentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TournamentFormService {
  createTournamentFormGroup(tournament: TournamentFormGroupInput = { id: null }): TournamentFormGroup {
    const tournamentRawValue = this.convertTournamentToTournamentRawValue({
      ...this.getFormDefaults(),
      ...tournament,
    });
    return new FormGroup<TournamentFormGroupContent>({
      id: new FormControl(
        { value: tournamentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tournamentName: new FormControl(tournamentRawValue.tournamentName),
      description: new FormControl(tournamentRawValue.description),
      startDate: new FormControl(tournamentRawValue.startDate),
      endDate: new FormControl(tournamentRawValue.endDate),
      startTime: new FormControl(tournamentRawValue.startTime),
      endTime: new FormControl(tournamentRawValue.endTime),
      lastInscriptionsDate: new FormControl(tournamentRawValue.lastInscriptionsDate),
      limitPax: new FormControl(tournamentRawValue.limitPax),
      prices: new FormControl(tournamentRawValue.prices),
      active: new FormControl(tournamentRawValue.active),
      location: new FormControl(tournamentRawValue.location),
      sponsors: new FormControl(tournamentRawValue.sponsors ?? []),
      teams: new FormControl(tournamentRawValue.teams ?? []),
      categories: new FormControl(tournamentRawValue.categories ?? []),
      levels: new FormControl(tournamentRawValue.levels ?? []),
    });
  }

  getTournament(form: TournamentFormGroup): ITournament | NewTournament {
    return this.convertTournamentRawValueToTournament(form.getRawValue() as TournamentFormRawValue | NewTournamentFormRawValue);
  }

  resetForm(form: TournamentFormGroup, tournament: TournamentFormGroupInput): void {
    const tournamentRawValue = this.convertTournamentToTournamentRawValue({ ...this.getFormDefaults(), ...tournament });
    form.reset(
      {
        ...tournamentRawValue,
        id: { value: tournamentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TournamentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
      startTime: currentTime,
      endTime: currentTime,
      lastInscriptionsDate: currentTime,
      active: false,
      sponsors: [],
      teams: [],
      categories: [],
      levels: [],
    };
  }

  private convertTournamentRawValueToTournament(
    rawTournament: TournamentFormRawValue | NewTournamentFormRawValue,
  ): ITournament | NewTournament {
    return {
      ...rawTournament,
      startDate: dayjs(rawTournament.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawTournament.endDate, DATE_TIME_FORMAT),
      startTime: dayjs(rawTournament.startTime, DATE_TIME_FORMAT),
      endTime: dayjs(rawTournament.endTime, DATE_TIME_FORMAT),
      lastInscriptionsDate: dayjs(rawTournament.lastInscriptionsDate, DATE_TIME_FORMAT),
    };
  }

  private convertTournamentToTournamentRawValue(
    tournament: ITournament | (Partial<NewTournament> & TournamentFormDefaults),
  ): TournamentFormRawValue | PartialWithRequiredKeyOf<NewTournamentFormRawValue> {
    return {
      ...tournament,
      startDate: tournament.startDate ? tournament.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: tournament.endDate ? tournament.endDate.format(DATE_TIME_FORMAT) : undefined,
      startTime: tournament.startTime ? tournament.startTime.format(DATE_TIME_FORMAT) : undefined,
      endTime: tournament.endTime ? tournament.endTime.format(DATE_TIME_FORMAT) : undefined,
      lastInscriptionsDate: tournament.lastInscriptionsDate ? tournament.lastInscriptionsDate.format(DATE_TIME_FORMAT) : undefined,
      sponsors: tournament.sponsors ?? [],
      teams: tournament.teams ?? [],
      categories: tournament.categories ?? [],
      levels: tournament.levels ?? [],
    };
  }
}
