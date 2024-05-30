import { ITeam } from 'app/entities/team/team.model';
import { CategoryEnum } from 'app/entities/enumerations/category-enum.model';
import { LevelEnum } from 'app/entities/enumerations/level-enum.model';

export interface IPlayer {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  age?: number | null;
  category?: keyof typeof CategoryEnum | null;
  level?: keyof typeof LevelEnum | null;
  teams?: Pick<ITeam, 'id' | 'teamName'>[] | null;
}

export type NewPlayer = Omit<IPlayer, 'id'> & { id: null };
