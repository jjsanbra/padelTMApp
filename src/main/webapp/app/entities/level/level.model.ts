import { ITournament } from 'app/entities/tournament/tournament.model';
import { LevelEnum } from 'app/entities/enumerations/level-enum.model';

export interface ILevel {
  id: number;
  levelName?: keyof typeof LevelEnum | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewLevel = Omit<ILevel, 'id'> & { id: null };
