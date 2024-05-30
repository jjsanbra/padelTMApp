import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegisterTeam, NewRegisterTeam } from '../register-team.model';

export type PartialUpdateRegisterTeam = Partial<IRegisterTeam> & Pick<IRegisterTeam, 'id'>;

export type EntityResponseType = HttpResponse<IRegisterTeam>;
export type EntityArrayResponseType = HttpResponse<IRegisterTeam[]>;

@Injectable({ providedIn: 'root' })
export class RegisterTeamService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/register-teams');

  create(registerTeam: NewRegisterTeam): Observable<EntityResponseType> {
    return this.http.post<IRegisterTeam>(this.resourceUrl, registerTeam, { observe: 'response' });
  }

  update(registerTeam: IRegisterTeam): Observable<EntityResponseType> {
    return this.http.put<IRegisterTeam>(`${this.resourceUrl}/${this.getRegisterTeamIdentifier(registerTeam)}`, registerTeam, {
      observe: 'response',
    });
  }

  partialUpdate(registerTeam: PartialUpdateRegisterTeam): Observable<EntityResponseType> {
    return this.http.patch<IRegisterTeam>(`${this.resourceUrl}/${this.getRegisterTeamIdentifier(registerTeam)}`, registerTeam, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegisterTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegisterTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
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
}
