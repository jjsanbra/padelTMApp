import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ISponsor } from 'app/entities/sponsor/sponsor.model';
import { SponsorService } from 'app/entities/sponsor/service/sponsor.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { ILevel } from 'app/entities/level/level.model';
import { LevelService } from 'app/entities/level/service/level.service';
import { ICourtType } from 'app/entities/court-type/court-type.model';
import { CourtTypeService } from 'app/entities/court-type/service/court-type.service';
import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';
import { IRegisterTeam } from 'app/entities/register-team/register-team.model';
import { RegisterTeamService } from 'app/entities/register-team/service/register-team.service';
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
  let sponsorService: SponsorService;
  let categoryService: CategoryService;
  let levelService: LevelService;
  let courtTypeService: CourtTypeService;
  let locationService: LocationService;
  let registerTeamService: RegisterTeamService;

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
    sponsorService = TestBed.inject(SponsorService);
    categoryService = TestBed.inject(CategoryService);
    levelService = TestBed.inject(LevelService);
    courtTypeService = TestBed.inject(CourtTypeService);
    locationService = TestBed.inject(LocationService);
    registerTeamService = TestBed.inject(RegisterTeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Sponsor query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const sponsors: ISponsor[] = [{ id: 16264 }];
      tournament.sponsors = sponsors;

      const sponsorCollection: ISponsor[] = [{ id: 24057 }];
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

    it('Should call Category query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const categories: ICategory[] = [{ id: 24484 }];
      tournament.categories = categories;

      const categoryCollection: ICategory[] = [{ id: 7344 }];
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
      const levels: ILevel[] = [{ id: 6932 }];
      tournament.levels = levels;

      const levelCollection: ILevel[] = [{ id: 22339 }];
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

    it('Should call CourtType query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const courtTypes: ICourtType[] = [{ id: 7967 }];
      tournament.courtTypes = courtTypes;

      const courtTypeCollection: ICourtType[] = [{ id: 24174 }];
      jest.spyOn(courtTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: courtTypeCollection })));
      const additionalCourtTypes = [...courtTypes];
      const expectedCollection: ICourtType[] = [...additionalCourtTypes, ...courtTypeCollection];
      jest.spyOn(courtTypeService, 'addCourtTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(courtTypeService.query).toHaveBeenCalled();
      expect(courtTypeService.addCourtTypeToCollectionIfMissing).toHaveBeenCalledWith(
        courtTypeCollection,
        ...additionalCourtTypes.map(expect.objectContaining),
      );
      expect(comp.courtTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Location query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const location: ILocation = { id: 2760 };
      tournament.location = location;

      const locationCollection: ILocation[] = [{ id: 15719 }];
      jest.spyOn(locationService, 'query').mockReturnValue(of(new HttpResponse({ body: locationCollection })));
      const additionalLocations = [location];
      const expectedCollection: ILocation[] = [...additionalLocations, ...locationCollection];
      jest.spyOn(locationService, 'addLocationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(locationService.query).toHaveBeenCalled();
      expect(locationService.addLocationToCollectionIfMissing).toHaveBeenCalledWith(
        locationCollection,
        ...additionalLocations.map(expect.objectContaining),
      );
      expect(comp.locationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call RegisterTeam query and add missing value', () => {
      const tournament: ITournament = { id: 456 };
      const registerTeams: IRegisterTeam[] = [{ id: 14019 }];
      tournament.registerTeams = registerTeams;

      const registerTeamCollection: IRegisterTeam[] = [{ id: 32332 }];
      jest.spyOn(registerTeamService, 'query').mockReturnValue(of(new HttpResponse({ body: registerTeamCollection })));
      const additionalRegisterTeams = [...registerTeams];
      const expectedCollection: IRegisterTeam[] = [...additionalRegisterTeams, ...registerTeamCollection];
      jest.spyOn(registerTeamService, 'addRegisterTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(registerTeamService.query).toHaveBeenCalled();
      expect(registerTeamService.addRegisterTeamToCollectionIfMissing).toHaveBeenCalledWith(
        registerTeamCollection,
        ...additionalRegisterTeams.map(expect.objectContaining),
      );
      expect(comp.registerTeamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tournament: ITournament = { id: 456 };
      const sponsors: ISponsor = { id: 9419 };
      tournament.sponsors = [sponsors];
      const categories: ICategory = { id: 25568 };
      tournament.categories = [categories];
      const levels: ILevel = { id: 1821 };
      tournament.levels = [levels];
      const courtTypes: ICourtType = { id: 16059 };
      tournament.courtTypes = [courtTypes];
      const location: ILocation = { id: 25404 };
      tournament.location = location;
      const registerTeam: IRegisterTeam = { id: 13640 };
      tournament.registerTeams = [registerTeam];

      activatedRoute.data = of({ tournament });
      comp.ngOnInit();

      expect(comp.sponsorsSharedCollection).toContain(sponsors);
      expect(comp.categoriesSharedCollection).toContain(categories);
      expect(comp.levelsSharedCollection).toContain(levels);
      expect(comp.courtTypesSharedCollection).toContain(courtTypes);
      expect(comp.locationsSharedCollection).toContain(location);
      expect(comp.registerTeamsSharedCollection).toContain(registerTeam);
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
    describe('compareSponsor', () => {
      it('Should forward to sponsorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(sponsorService, 'compareSponsor');
        comp.compareSponsor(entity, entity2);
        expect(sponsorService.compareSponsor).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareCourtType', () => {
      it('Should forward to courtTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courtTypeService, 'compareCourtType');
        comp.compareCourtType(entity, entity2);
        expect(courtTypeService.compareCourtType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLocation', () => {
      it('Should forward to locationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(locationService, 'compareLocation');
        comp.compareLocation(entity, entity2);
        expect(locationService.compareLocation).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRegisterTeam', () => {
      it('Should forward to registerTeamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(registerTeamService, 'compareRegisterTeam');
        comp.compareRegisterTeam(entity, entity2);
        expect(registerTeamService.compareRegisterTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
