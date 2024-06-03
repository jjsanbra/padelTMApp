import { ITournament } from 'app/entities/tournament/tournament.model';

export interface ICourtType {
  id: number;
  courtTypeName?: string | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewCourtType = Omit<ICourtType, 'id'> & { id: null };
