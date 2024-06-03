import { ILevel } from 'app/entities/level/level.model';
import { ITeam } from 'app/entities/team/team.model';

export interface IPlayer {
  id: number;
  userName?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  age?: number | null;
  avatar?: string | null;
  avatarContentType?: string | null;
  level?: Pick<ILevel, 'id' | 'levelName'> | null;
  teams?: Pick<ITeam, 'id' | 'teamName'>[] | null;
}

export type NewPlayer = Omit<IPlayer, 'id'> & { id: null };
