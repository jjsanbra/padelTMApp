import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'padelTmApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'tournament',
    data: { pageTitle: 'padelTmApp.tournament.home.title' },
    loadChildren: () => import('./tournament/tournament.routes'),
  },
  {
    path: 'player',
    data: { pageTitle: 'padelTmApp.player.home.title' },
    loadChildren: () => import('./player/player.routes'),
  },
  {
    path: 'team',
    data: { pageTitle: 'padelTmApp.team.home.title' },
    loadChildren: () => import('./team/team.routes'),
  },
  {
    path: 'register-team',
    data: { pageTitle: 'padelTmApp.registerTeam.home.title' },
    loadChildren: () => import('./register-team/register-team.routes'),
  },
  {
    path: 'location',
    data: { pageTitle: 'padelTmApp.location.home.title' },
    loadChildren: () => import('./location/location.routes'),
  },
  {
    path: 'country',
    data: { pageTitle: 'padelTmApp.country.home.title' },
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: 'category',
    data: { pageTitle: 'padelTmApp.category.home.title' },
    loadChildren: () => import('./category/category.routes'),
  },
  {
    path: 'level',
    data: { pageTitle: 'padelTmApp.level.home.title' },
    loadChildren: () => import('./level/level.routes'),
  },
  {
    path: 'sponsor',
    data: { pageTitle: 'padelTmApp.sponsor.home.title' },
    loadChildren: () => import('./sponsor/sponsor.routes'),
  },
  {
    path: 'court-type',
    data: { pageTitle: 'padelTmApp.courtType.home.title' },
    loadChildren: () => import('./court-type/court-type.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
