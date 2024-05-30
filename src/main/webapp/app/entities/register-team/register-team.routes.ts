import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RegisterTeamComponent } from './list/register-team.component';
import { RegisterTeamDetailComponent } from './detail/register-team-detail.component';
import { RegisterTeamUpdateComponent } from './update/register-team-update.component';
import RegisterTeamResolve from './route/register-team-routing-resolve.service';

const registerTeamRoute: Routes = [
  {
    path: '',
    component: RegisterTeamComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegisterTeamDetailComponent,
    resolve: {
      registerTeam: RegisterTeamResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegisterTeamUpdateComponent,
    resolve: {
      registerTeam: RegisterTeamResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegisterTeamUpdateComponent,
    resolve: {
      registerTeam: RegisterTeamResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default registerTeamRoute;
