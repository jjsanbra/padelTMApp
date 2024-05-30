import { CountryEnum } from 'app/entities/enumerations/country-enum.model';

export interface ICountry {
  id: number;
  countryName?: keyof typeof CountryEnum | null;
}

export type NewCountry = Omit<ICountry, 'id'> & { id: null };
