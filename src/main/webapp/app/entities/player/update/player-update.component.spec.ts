import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IPlayer } from '../player.model';
import { PlayerService } from '../service/player.service';
import { PlayerFormService } from './player-form.service';

import { PlayerUpdateComponent } from './player-update.component';

describe('Player Management Update Component', () => {
  let comp: PlayerUpdateComponent;
  let fixture: ComponentFixture<PlayerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let playerFormService: PlayerFormService;
  let playerService: PlayerService;
  let categoryService: CategoryService;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PlayerUpdateComponent],
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
      .overrideTemplate(PlayerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlayerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    playerFormService = TestBed.inject(PlayerFormService);
    playerService = TestBed.inject(PlayerService);
    categoryService = TestBed.inject(CategoryService);
    teamService = TestBed.inject(TeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Category query and add missing value', () => {
      const player: IPlayer = { id: 456 };
      const categories: ICategory[] = [{ id: 14906 }];
      player.categories = categories;

      const categoryCollection: ICategory[] = [{ id: 16985 }];
      jest.spyOn(categoryService, 'query').mockReturnValue(of(new HttpResponse({ body: categoryCollection })));
      const additionalCategories = [...categories];
      const expectedCollection: ICategory[] = [...additionalCategories, ...categoryCollection];
      jest.spyOn(categoryService, 'addCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ player });
      comp.ngOnInit();

      expect(categoryService.query).toHaveBeenCalled();
      expect(categoryService.addCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        categoryCollection,
        ...additionalCategories.map(expect.objectContaining),
      );
      expect(comp.categoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const player: IPlayer = { id: 456 };
      const teams: ITeam[] = [{ id: 21146 }];
      player.teams = teams;

      const teamCollection: ITeam[] = [{ id: 19477 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [...teams];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ player });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const player: IPlayer = { id: 456 };
      const category: ICategory = { id: 12699 };
      player.categories = [category];
      const teams: ITeam = { id: 18140 };
      player.teams = [teams];

      activatedRoute.data = of({ player });
      comp.ngOnInit();

      expect(comp.categoriesSharedCollection).toContain(category);
      expect(comp.teamsSharedCollection).toContain(teams);
      expect(comp.player).toEqual(player);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlayer>>();
      const player = { id: 123 };
      jest.spyOn(playerFormService, 'getPlayer').mockReturnValue(player);
      jest.spyOn(playerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ player });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: player }));
      saveSubject.complete();

      // THEN
      expect(playerFormService.getPlayer).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(playerService.update).toHaveBeenCalledWith(expect.objectContaining(player));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlayer>>();
      const player = { id: 123 };
      jest.spyOn(playerFormService, 'getPlayer').mockReturnValue({ id: null });
      jest.spyOn(playerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ player: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: player }));
      saveSubject.complete();

      // THEN
      expect(playerFormService.getPlayer).toHaveBeenCalled();
      expect(playerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlayer>>();
      const player = { id: 123 };
      jest.spyOn(playerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ player });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(playerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCategory', () => {
      it('Should forward to categoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(categoryService, 'compareCategory');
        comp.compareCategory(entity, entity2);
        expect(categoryService.compareCategory).toHaveBeenCalledWith(entity, entity2);
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
  });
});
