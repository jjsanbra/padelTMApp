import { ILevel } from 'app/entities/level/level.model';
import { ICategory } from 'app/entities/category/category.model';
import { IPlayer } from 'app/entities/player/player.model';
import { ITournament } from 'app/entities/tournament/tournament.model';

export interface ITeam {
  id: number;
  teamName?: string | null;
  logo?: string | null;
  logoContentType?: string | null;
  level?: Pick<ILevel, 'id' | 'levelName'> | null;
  category?: Pick<ICategory, 'id' | 'categoryName'> | null;
  players?: Pick<IPlayer, 'id' | 'firstName'>[] | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewTeam = Omit<ITeam, 'id'> & { id: null };
