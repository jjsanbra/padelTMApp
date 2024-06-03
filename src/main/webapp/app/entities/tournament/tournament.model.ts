import dayjs from 'dayjs/esm';
import { ILocation } from 'app/entities/location/location.model';
import { ISponsor } from 'app/entities/sponsor/sponsor.model';
import { ITeam } from 'app/entities/team/team.model';
import { ICategory } from 'app/entities/category/category.model';
import { ILevel } from 'app/entities/level/level.model';
import { ICourtType } from 'app/entities/court-type/court-type.model';

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
  location?: Pick<ILocation, 'id' | 'city'> | null;
  sponsors?: Pick<ISponsor, 'id' | 'sponsorName'>[] | null;
  teams?: Pick<ITeam, 'id' | 'teamName'>[] | null;
  categories?: Pick<ICategory, 'id' | 'categoryName'>[] | null;
  levels?: Pick<ILevel, 'id' | 'levelName'>[] | null;
  courtTypes?: Pick<ICourtType, 'id' | 'courtTypeName'>[] | null;
}

export type NewTournament = Omit<ITournament, 'id'> & { id: null };
