import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';
import { ISponsor } from 'app/entities/sponsor/sponsor.model';
import { SponsorService } from 'app/entities/sponsor/service/sponsor.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { ILevel } from 'app/entities/level/level.model';
import { LevelService } from 'app/entities/level/service/level.service';
import { ITournament } from '../tournament.model';
import { TournamentService } from '../service/tournament.service';
import { TournamentFormService } from './tournament-form.service';

import { TournamentUpdateComponent } from './tournament-update.component';

describe('Tournament Management Update Component', () => {
  let comp: TournamentUpdateComponent;
  let fixture: ComponentFixture<TournamentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tournamentFormService: TournamentFormService;
  let tournamentService: TournamentService;
  let locationService: LocationService;
  let sponsorService: SponsorService;
  let teamService: TeamService;
  let categoryService: CategoryService;
  let levelService: LevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TournamentUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TournamentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TournamentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tournamentFormService = TestBed.inject(TournamentFormService);
    tournamentService = TestBed.inject(TournamentService);
    locationService = TestBed.inject(LocationService);
    sponsorService = TestBed.inject(SponsorService);
    teamService = TestBed.inject(TeamService);
    categoryService = TestBed.inject(CategoryService);
    levelService = TestBed.inject(LevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call location query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const location: ILocation = { id: 27470 };
      tournament.location = location;

      const locationCollection: ILocation[] = [{ id: 13281 }];
      jest.spyOn(locationService, 'query').mockReturnValue(of(new HttpResponse({ body: locationCollection })));
      const expectedCollection: ILocation[] = [location, ...locationCollection];
      jest.spyOn(locationService, 'addLocationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(locationService.query).toHaveBeenCalled();
      expect(locationService.addLocationToCollectionIfMissing).toHaveBeenCalledWith(locationCollection, location);
      expect(comp.locationsCollection).toEqual(expectedCollection);
    });

    it('Should call Sponsor query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const sponsors: ISponsor[] = [{ id: 4073 }];
      tournament.sponsors = sponsors;

      const sponsorCollection: ISponsor[] = [{ id: 27694 }];
      jest.spyOn(sponsorService, 'query').mockReturnValue(of(new HttpResponse({ body: sponsorCollection })));
      const additionalSponsors = [...sponsors];
      const expectedCollection: ISponsor[] = [...additionalSponsors, ...sponsorCollection];
      jest.spyOn(sponsorService, 'addSponsorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(sponsorService.query).toHaveBeenCalled();
      expect(sponsorService.addSponsorToCollectionIfMissing).toHaveBeenCalledWith(
        sponsorCollection,
        ...additionalSponsors.map(expect.objectContaining),
      );
      expect(comp.sponsorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const teams: ITeam[] = [{ id: 26911 }];
      tournament.teams = teams;

      const teamCollection: ITeam[] = [{ id: 4682 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [...teams];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Category query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const categories: ICategory[] = [{ id: 31351 }];
      tournament.categories = categories;

      const categoryCollection: ICategory[] = [{ id: 31950 }];
      jest.spyOn(categoryService, 'query').mockReturnValue(of(new HttpResponse({ body: categoryCollection })));
      const additionalCategories = [...categories];
      const expectedCollection: ICategory[] = [...additionalCategories, ...categoryCollection];
      jest.spyOn(categoryService, 'addCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(categoryService.query).toHaveBeenCalled();
      expect(categoryService.addCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        categoryCollection,
        ...additionalCategories.map(expect.objectContaining),
      );
      expect(comp.categoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Level query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const levels: ILevel[] = [{ id: 6770 }];
      tournament.levels = levels;

      const levelCollection: ILevel[] = [{ id: 10171 }];
      jest.spyOn(levelService, 'query').mockReturnValue(of(new HttpResponse({ body: levelCollection })));
      const additionalLevels = [...levels];
      const expectedCollection: ILevel[] = [...additionalLevels, ...levelCollection];
      jest.spyOn(levelService, 'addLevelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(levelService.query).toHaveBeenCalled();
      expect(levelService.addLevelToCollectionIfMissing).toHaveBeenCalledWith(
        levelCollection,
        ...additionalLevels.map(expect.objectContaining),
      );
      expect(comp.levelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tournament: ITournament = { id: 456 };
      const location: ILocation = { id: 21402 };
      tournament.location = location;
      const sponsor: ISponsor = { id: 15987 };
      tournament.sponsors = [sponsor];
      const team: ITeam = { id: 4869 };
      tournament.teams = [team];
      const category: ICategory = { id: 25694 };
      tournament.categories = [category];
      const level: ILevel = { id: 32353 };
      tournament.levels = [level];

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(comp.locationsCollection).toContain(location);
      expect(comp.sponsorsSharedCollection).toContain(sponsor);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.categoriesSharedCollection).toContain(category);
      expect(comp.levelsSharedCollection).toContain(level);
      expect(comp.tournament).toEqual(tournament);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITournament>>();
      const tournament = { id: 123 };
      jest.spyOn(tournamentFormService, 'getTournament').mockReturnValue(tournament);
      jest.spyOn(tournamentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tournament }));
      saveSubject.complete();

      // THEN
      expect(tournamentFormService.getTournament).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tournamentService.update).toHaveBeenCalledWith(expect.objectContaining(tournament));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITournament>>();
      const tournament = { id: 123 };
      jest.spyOn(tournamentFormService, 'getTournament').mockReturnValue({ id: null });
      jest.spyOn(tournamentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tournament: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tournament }));
      saveSubject.complete();

      // THEN
      expect(tournamentFormService.getTournament).toHaveBeenCalled();
      expect(tournamentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITournament>>();
      const tournament = { id: 123 };
      jest.spyOn(tournamentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tournamentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLocation', () => {
      it('Should forward to locationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(locationService, 'compareLocation');
        comp.compareLocation(entity, entity2);
        expect(locationService.compareLocation).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSponsor', () => {
      it('Should forward to sponsorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(sponsorService, 'compareSponsor');
        comp.compareSponsor(entity, entity2);
        expect(sponsorService.compareSponsor).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCategory', () => {
      it('Should forward to categoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(categoryService, 'compareCategory');
        comp.compareCategory(entity, entity2);
        expect(categoryService.compareCategory).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLevel', () => {
      it('Should forward to levelService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(levelService, 'compareLevel');
        comp.compareLevel(entity, entity2);
        expect(levelService.compareLevel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
