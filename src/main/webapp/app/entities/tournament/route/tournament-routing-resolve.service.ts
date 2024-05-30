import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITournament } from '../tournament.model';
import { TournamentService } from '../service/tournament.service';

const tournamentResolve = (route: ActivatedRouteSnapshot): Observable<null | ITournament> => {
  const id = route.params['id'];
  if (id) {
    return inject(TournamentService)
      .find(id)
      .pipe(
        mergeMap((tournament: HttpResponse<ITournament>) => {
          if (tournament.body) {
            return of(tournament.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tournamentResolve;
