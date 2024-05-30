import { ITournament } from 'app/entities/tournament/tournament.model';

export interface ISponsor {
  id: number;
  sponsorName?: string | null;
  description?: string | null;
  tournaments?: Pick<ITournament, 'id' | 'tournamentName'>[] | null;
}

export type NewSponsor = Omit<ISponsor, 'id'> & { id: null };
