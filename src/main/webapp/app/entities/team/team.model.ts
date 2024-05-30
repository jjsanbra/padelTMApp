import { IPlayer } from 'app/entities/player/player.model';
import { ITournament } from 'app/entities/tournament/tournament.model';
import { LevelEnum } from 'app/entities/enumerations/level-enum.model';
import { CategoryEnum } from 'app/entities/enumerations/category-enum.model';

export interface ITeam {
  id: number;
  teamName?: string | null;
  level?: keyof typeof LevelEnum | null;
  category?: keyof typeof CategoryEnum | null;
  players?: Pick<IPlayer, 'id' | 'firstName'>[] | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewTeam = Omit<ITeam, 'id'> & { id: null };
