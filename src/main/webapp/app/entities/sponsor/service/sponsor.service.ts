import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISponsor, NewSponsor } from '../sponsor.model';

export type PartialUpdateSponsor = Partial<ISponsor> & Pick<ISponsor, 'id'>;

export type EntityResponseType = HttpResponse<ISponsor>;
export type EntityArrayResponseType = HttpResponse<ISponsor[]>;

@Injectable({ providedIn: 'root' })
export class SponsorService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sponsors');

  create(sponsor: NewSponsor): Observable<EntityResponseType> {
    return this.http.post<ISponsor>(this.resourceUrl, sponsor, { observe: 'response' });
  }

  update(sponsor: ISponsor): Observable<EntityResponseType> {
    return this.http.put<ISponsor>(`${this.resourceUrl}/${this.getSponsorIdentifier(sponsor)}`, sponsor, { observe: 'response' });
  }

  partialUpdate(sponsor: PartialUpdateSponsor): Observable<EntityResponseType> {
    return this.http.patch<ISponsor>(`${this.resourceUrl}/${this.getSponsorIdentifier(sponsor)}`, sponsor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISponsor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISponsor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSponsorIdentifier(sponsor: Pick<ISponsor, 'id'>): number {
    return sponsor.id;
  }

  compareSponsor(o1: Pick<ISponsor, 'id'> | null, o2: Pick<ISponsor, 'id'> | null): boolean {
    return o1 && o2 ? this.getSponsorIdentifier(o1) === this.getSponsorIdentifier(o2) : o1 === o2;
  }

  addSponsorToCollectionIfMissing<Type extends Pick<ISponsor, 'id'>>(
    sponsorCollection: Type[],
    ...sponsorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sponsors: Type[] = sponsorsToCheck.filter(isPresent);
    if (sponsors.length > 0) {
      const sponsorCollectionIdentifiers = sponsorCollection.map(sponsorItem => this.getSponsorIdentifier(sponsorItem));
      const sponsorsToAdd = sponsors.filter(sponsorItem => {
        const sponsorIdentifier = this.getSponsorIdentifier(sponsorItem);
        if (sponsorCollectionIdentifiers.includes(sponsorIdentifier)) {
          return false;
        }
        sponsorCollectionIdentifiers.push(sponsorIdentifier);
        return true;
      });
      return [...sponsorsToAdd, ...sponsorCollection];
    }
    return sponsorCollection;
  }
}
