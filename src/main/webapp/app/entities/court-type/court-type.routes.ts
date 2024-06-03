import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CourtTypeComponent } from './list/court-type.component';
import { CourtTypeDetailComponent } from './detail/court-type-detail.component';
import { CourtTypeUpdateComponent } from './update/court-type-update.component';
import CourtTypeResolve from './route/court-type-routing-resolve.service';

const courtTypeRoute: Routes = [
  {
    path: '',
    component: CourtTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CourtTypeDetailComponent,
    resolve: {
      courtType: CourtTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CourtTypeUpdateComponent,
    resolve: {
      courtType: CourtTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CourtTypeUpdateComponent,
    resolve: {
      courtType: CourtTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courtTypeRoute;
