import dayjs from 'dayjs/esm';
import { ITeam } from 'app/entities/team/team.model';
import { ITournament } from 'app/entities/tournament/tournament.model';

export interface IRegisterTeam {
  id: number;
  registerDate?: dayjs.Dayjs | null;
  team?: Pick<ITeam, 'id' | 'teamName'> | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewRegisterTeam = Omit<IRegisterTeam, 'id'> & { id: null };
