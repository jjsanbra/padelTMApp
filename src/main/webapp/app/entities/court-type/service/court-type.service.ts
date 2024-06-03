import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICourtType, NewCourtType } from '../court-type.model';

export type PartialUpdateCourtType = Partial<ICourtType> & Pick<ICourtType, 'id'>;

export type EntityResponseType = HttpResponse<ICourtType>;
export type EntityArrayResponseType = HttpResponse<ICourtType[]>;

@Injectable({ providedIn: 'root' })
export class CourtTypeService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/court-types');

  create(courtType: NewCourtType): Observable<EntityResponseType> {
    return this.http.post<ICourtType>(this.resourceUrl, courtType, { observe: 'response' });
  }

  update(courtType: ICourtType): Observable<EntityResponseType> {
    return this.http.put<ICourtType>(`${this.resourceUrl}/${this.getCourtTypeIdentifier(courtType)}`, courtType, { observe: 'response' });
  }

  partialUpdate(courtType: PartialUpdateCourtType): Observable<EntityResponseType> {
    return this.http.patch<ICourtType>(`${this.resourceUrl}/${this.getCourtTypeIdentifier(courtType)}`, courtType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICourtType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICourtType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCourtTypeIdentifier(courtType: Pick<ICourtType, 'id'>): number {
    return courtType.id;
  }

  compareCourtType(o1: Pick<ICourtType, 'id'> | null, o2: Pick<ICourtType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCourtTypeIdentifier(o1) === this.getCourtTypeIdentifier(o2) : o1 === o2;
  }

  addCourtTypeToCollectionIfMissing<Type extends Pick<ICourtType, 'id'>>(
    courtTypeCollection: Type[],
    ...courtTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const courtTypes: Type[] = courtTypesToCheck.filter(isPresent);
    if (courtTypes.length > 0) {
      const courtTypeCollectionIdentifiers = courtTypeCollection.map(courtTypeItem => this.getCourtTypeIdentifier(courtTypeItem));
      const courtTypesToAdd = courtTypes.filter(courtTypeItem => {
        const courtTypeIdentifier = this.getCourtTypeIdentifier(courtTypeItem);
        if (courtTypeCollectionIdentifiers.includes(courtTypeIdentifier)) {
          return false;
        }
        courtTypeCollectionIdentifiers.push(courtTypeIdentifier);
        return true;
      });
      return [...courtTypesToAdd, ...courtTypeCollection];
    }
    return courtTypeCollection;
  }
}
