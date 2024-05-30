export interface IRegisterTeam {
  id: number;
  teamName?: string | null;
}

export type NewRegisterTeam = Omit<IRegisterTeam, 'id'> & { id: null };
