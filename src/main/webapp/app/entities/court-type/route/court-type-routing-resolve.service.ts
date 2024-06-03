import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICourtType } from '../court-type.model';
import { CourtTypeService } from '../service/court-type.service';

const courtTypeResolve = (route: ActivatedRouteSnapshot): Observable<null | ICourtType> => {
  const id = route.params['id'];
  if (id) {
    return inject(CourtTypeService)
      .find(id)
      .pipe(
        mergeMap((courtType: HttpResponse<ICourtType>) => {
          if (courtType.body) {
            return of(courtType.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default courtTypeResolve;
