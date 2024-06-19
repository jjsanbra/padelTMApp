import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegisterTeam, NewRegisterTeam } from '../register-team.model';

export type PartialUpdateRegisterTeam = Partial<IRegisterTeam> & Pick<IRegisterTeam, 'id'>;

type RestOf<T extends IRegisterTeam | NewRegisterTeam> = Omit<T, 'registerDate'> & {
  registerDate?: string | null;
};

export type RestRegisterTeam = RestOf<IRegisterTeam>;

export type NewRestRegisterTeam = RestOf<NewRegisterTeam>;

export type PartialUpdateRestRegisterTeam = RestOf<PartialUpdateRegisterTeam>;

export type EntityResponseType = HttpResponse<IRegisterTeam>;
export type EntityArrayResponseType = HttpResponse<IRegisterTeam[]>;

@Injectable({ providedIn: 'root' })
export class RegisterTeamService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/register-teams');

  create(registerTeam: NewRegisterTeam): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registerTeam);
    return this.http
      .post<RestRegisterTeam>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(registerTeam: IRegisterTeam): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registerTeam);
    return this.http
      .put<RestRegisterTeam>(`${this.resourceUrl}/${this.getRegisterTeamIdentifier(registerTeam)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(registerTeam: PartialUpdateRegisterTeam): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(registerTeam);
    return this.http
      .patch<RestRegisterTeam>(`${this.resourceUrl}/${this.getRegisterTeamIdentifier(registerTeam)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRegisterTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRegisterTeam[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRegisterTeamIdentifier(registerTeam: Pick<IRegisterTeam, 'id'>): number {
    return registerTeam.id;
  }

  compareRegisterTeam(o1: Pick<IRegisterTeam, 'id'> | null, o2: Pick<IRegisterTeam, 'id'> | null): boolean {
    return o1 && o2 ? this.getRegisterTeamIdentifier(o1) === this.getRegisterTeamIdentifier(o2) : o1 === o2;
  }

  addRegisterTeamToCollectionIfMissing<Type extends Pick<IRegisterTeam, 'id'>>(
    registerTeamCollection: Type[],
    ...registerTeamsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const registerTeams: Type[] = registerTeamsToCheck.filter(isPresent);
    if (registerTeams.length > 0) {
      const registerTeamCollectionIdentifiers = registerTeamCollection.map(registerTeamItem =>
        this.getRegisterTeamIdentifier(registerTeamItem),
      );
      const registerTeamsToAdd = registerTeams.filter(registerTeamItem => {
        const registerTeamIdentifier = this.getRegisterTeamIdentifier(registerTeamItem);
        if (registerTeamCollectionIdentifiers.includes(registerTeamIdentifier)) {
          return false;
        }
        registerTeamCollectionIdentifiers.push(registerTeamIdentifier);
        return true;
      });
      return [...registerTeamsToAdd, ...registerTeamCollection];
    }
    return registerTeamCollection;
  }

  protected convertDateFromClient<T extends IRegisterTeam | NewRegisterTeam | PartialUpdateRegisterTeam>(registerTeam: T): RestOf<T> {
    return {
      ...registerTeam,
      registerDate: registerTeam.registerDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restRegisterTeam: RestRegisterTeam): IRegisterTeam {
    return {
      ...restRegisterTeam,
      registerDate: restRegisterTeam.registerDate ? dayjs(restRegisterTeam.registerDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRegisterTeam>): HttpResponse<IRegisterTeam> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRegisterTeam[]>): HttpResponse<IRegisterTeam[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
