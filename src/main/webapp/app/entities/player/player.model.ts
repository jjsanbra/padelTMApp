import { IUser } from 'app/entities/user/user.model';
import { ILevel } from 'app/entities/level/level.model';
import { ICategory } from 'app/entities/category/category.model';
import { ITeam } from 'app/entities/team/team.model';

export interface IPlayer {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  age?: number | null;
  avatar?: string | null;
  avatarContentType?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  level?: Pick<ILevel, 'id' | 'levelName'> | null;
  categories?: Pick<ICategory, 'id' | 'categoryName'>[] | null;
  teams?: Pick<ITeam, 'id' | 'teamName'>[] | null;
}

export type NewPlayer = Omit<IPlayer, 'id'> & { id: null };
