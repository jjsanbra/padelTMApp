import { ITournament } from 'app/entities/tournament/tournament.model';
import { CategoryEnum } from 'app/entities/enumerations/category-enum.model';

export interface ICategory {
  id: number;
  categoryName?: keyof typeof CategoryEnum | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
