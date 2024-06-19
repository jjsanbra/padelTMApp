import dayjs from 'dayjs/esm';
import { ISponsor } from 'app/entities/sponsor/sponsor.model';
import { ICategory } from 'app/entities/category/category.model';
import { ILevel } from 'app/entities/level/level.model';
import { ICourtType } from 'app/entities/court-type/court-type.model';
import { ILocation } from 'app/entities/location/location.model';
import { IRegisterTeam } from 'app/entities/register-team/register-team.model';

export interface ITournament {
  id: number;
  tournamentName?: string | null;
  description?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  lastInscriptionsDate?: dayjs.Dayjs | null;
  maxTeamsAllowed?: number | null;
  prices?: string | null;
  active?: boolean | null;
  poster?: string | null;
  posterContentType?: string | null;
  sponsors?: Pick<ISponsor, 'id' | 'sponsorName'>[] | null;
  categories?: Pick<ICategory, 'id' | 'categoryName'>[] | null;
  levels?: Pick<ILevel, 'id' | 'levelName'>[] | null;
  courtTypes?: Pick<ICourtType, 'id' | 'courtTypeName'>[] | null;
  location?: Pick<ILocation, 'id' | 'city'> | null;
  registerTeams?: Pick<IRegisterTeam, 'id'>[] | null;
}

export type NewTournament = Omit<ITournament, 'id'> & { id: null };
