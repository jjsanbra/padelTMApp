import { ITournament } from 'app/entities/tournament/tournament.model';

export interface ILevel {
  id: number;
  levelName?: string | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewLevel = Omit<ILevel, 'id'> & { id: null };
