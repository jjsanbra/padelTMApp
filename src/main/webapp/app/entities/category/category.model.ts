import { ITournament } from 'app/entities/tournament/tournament.model';
import { IPlayer } from 'app/entities/player/player.model';
import { CategoryEnum } from 'app/entities/enumerations/category-enum.model';

export interface ICategory {
  id: number;
  categoryName?: keyof typeof CategoryEnum | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
  players?: Pick<IPlayer, 'id' | 'firstName'>[] | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
