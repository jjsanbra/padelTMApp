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
type FormValueOf<T extends ITournament | NewTournament> = Omit<T, 'startDate' | 'endDate' | 'lastInscriptionsDate'> & {
  startDate?: string | null;
  endDate?: string | null;
  lastInscriptionsDate?: string | null;
};

type TournamentFormRawValue = FormValueOf<ITournament>;

type NewTournamentFormRawValue = FormValueOf<NewTournament>;

type TournamentFormDefaults = Pick<
  NewTournament,
  'id' | 'startDate' | 'endDate' | 'lastInscriptionsDate' | 'active' | 'sponsors' | 'categories' | 'levels' | 'courtTypes' | 'registerTeams'
>;

type TournamentFormGroupContent = {
  id: FormControl<TournamentFormRawValue['id'] | NewTournament['id']>;
  tournamentName: FormControl<TournamentFormRawValue['tournamentName']>;
  description: FormControl<TournamentFormRawValue['description']>;
  startDate: FormControl<TournamentFormRawValue['startDate']>;
  endDate: FormControl<TournamentFormRawValue['endDate']>;
  lastInscriptionsDate: FormControl<TournamentFormRawValue['lastInscriptionsDate']>;
  maxTeamsAllowed: FormControl<TournamentFormRawValue['maxTeamsAllowed']>;
  prices: FormControl<TournamentFormRawValue['prices']>;
  active: FormControl<TournamentFormRawValue['active']>;
  poster: FormControl<TournamentFormRawValue['poster']>;
  posterContentType: FormControl<TournamentFormRawValue['posterContentType']>;
  sponsors: FormControl<TournamentFormRawValue['sponsors']>;
  categories: FormControl<TournamentFormRawValue['categories']>;
  levels: FormControl<TournamentFormRawValue['levels']>;
  courtTypes: FormControl<TournamentFormRawValue['courtTypes']>;
  location: FormControl<TournamentFormRawValue['location']>;
  registerTeams: FormControl<TournamentFormRawValue['registerTeams']>;
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
      lastInscriptionsDate: new FormControl(tournamentRawValue.lastInscriptionsDate),
      maxTeamsAllowed: new FormControl(tournamentRawValue.maxTeamsAllowed, {
        validators: [Validators.min(4), Validators.max(120)],
      }),
      prices: new FormControl(tournamentRawValue.prices),
      active: new FormControl(tournamentRawValue.active),
      poster: new FormControl(tournamentRawValue.poster),
      posterContentType: new FormControl(tournamentRawValue.posterContentType),
      sponsors: new FormControl(tournamentRawValue.sponsors ?? []),
      categories: new FormControl(tournamentRawValue.categories ?? []),
      levels: new FormControl(tournamentRawValue.levels ?? []),
      courtTypes: new FormControl(tournamentRawValue.courtTypes ?? []),
      location: new FormControl(tournamentRawValue.location),
      registerTeams: new FormControl(tournamentRawValue.registerTeams ?? []),
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
      lastInscriptionsDate: currentTime,
      active: false,
      sponsors: [],
      categories: [],
      levels: [],
      courtTypes: [],
      registerTeams: [],
    };
  }

  private convertTournamentRawValueToTournament(
    rawTournament: TournamentFormRawValue | NewTournamentFormRawValue,
  ): ITournament | NewTournament {
    return {
      ...rawTournament,
      startDate: dayjs(rawTournament.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawTournament.endDate, DATE_TIME_FORMAT),
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
      lastInscriptionsDate: tournament.lastInscriptionsDate ? tournament.lastInscriptionsDate.format(DATE_TIME_FORMAT) : undefined,
      sponsors: tournament.sponsors ?? [],
      categories: tournament.categories ?? [],
      levels: tournament.levels ?? [],
      courtTypes: tournament.courtTypes ?? [],
      registerTeams: tournament.registerTeams ?? [],
    };
  }
}
