import { ITournament } from 'app/entities/tournament/tournament.model';

export interface ICategory {
  id: number;
  categoryName?: string | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
