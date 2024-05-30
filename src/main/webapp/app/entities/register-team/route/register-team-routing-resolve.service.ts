import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegisterTeam } from '../register-team.model';
import { RegisterTeamService } from '../service/register-team.service';

const registerTeamResolve = (route: ActivatedRouteSnapshot): Observable<null | IRegisterTeam> => {
  const id = route.params['id'];
  if (id) {
    return inject(RegisterTeamService)
      .find(id)
      .pipe(
        mergeMap((registerTeam: HttpResponse<IRegisterTeam>) => {
          if (registerTeam.body) {
            return of(registerTeam.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default registerTeamResolve;
