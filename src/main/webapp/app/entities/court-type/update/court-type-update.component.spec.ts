import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { CourtTypeService } from '../service/court-type.service';
import { ICourtType } from '../court-type.model';
import { CourtTypeFormService } from './court-type-form.service';

import { CourtTypeUpdateComponent } from './court-type-update.component';

describe('CourtType Management Update Component', () => {
  let comp: CourtTypeUpdateComponent;
  let fixture: ComponentFixture<CourtTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courtTypeFormService: CourtTypeFormService;
  let courtTypeService: CourtTypeService;
  let tournamentService: TournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CourtTypeUpdateComponent],
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
      .overrideTemplate(CourtTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourtTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courtTypeFormService = TestBed.inject(CourtTypeFormService);
    courtTypeService = TestBed.inject(CourtTypeService);
    tournamentService = TestBed.inject(TournamentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Tournament query and add missing value', () => {
      const courtType: ICourtType = { id: 456 };
      const tournaments: ITournament[] = [{ id: 3940 }];
      courtType.tournaments = tournaments;

      const tournamentCollection: ITournament[] = [{ id: 7683 }];
      jest.spyOn(tournamentService, 'query').mockReturnValue(of(new HttpResponse({ body: tournamentCollection })));
      const additionalTournaments = [...tournaments];
      const expectedCollection: ITournament[] = [...additionalTournaments, ...tournamentCollection];
      jest.spyOn(tournamentService, 'addTournamentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      expect(tournamentService.query).toHaveBeenCalled();
      expect(tournamentService.addTournamentToCollectionIfMissing).toHaveBeenCalledWith(
        tournamentCollection,
        ...additionalTournaments.map(expect.objectContaining),
      );
      expect(comp.tournamentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const courtType: ICourtType = { id: 456 };
      const tournaments: ITournament = { id: 6126 };
      courtType.tournaments = [tournaments];

      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      expect(comp.tournamentsSharedCollection).toContain(tournaments);
      expect(comp.courtType).toEqual(courtType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourtType>>();
      const courtType = { id: 123 };
      jest.spyOn(courtTypeFormService, 'getCourtType').mockReturnValue(courtType);
      jest.spyOn(courtTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courtType }));
      saveSubject.complete();

      // THEN
      expect(courtTypeFormService.getCourtType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courtTypeService.update).toHaveBeenCalledWith(expect.objectContaining(courtType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourtType>>();
      const courtType = { id: 123 };
      jest.spyOn(courtTypeFormService, 'getCourtType').mockReturnValue({ id: null });
      jest.spyOn(courtTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courtType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courtType }));
      saveSubject.complete();

      // THEN
      expect(courtTypeFormService.getCourtType).toHaveBeenCalled();
      expect(courtTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourtType>>();
      const courtType = { id: 123 };
      jest.spyOn(courtTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courtTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTournament', () => {
      it('Should forward to tournamentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tournamentService, 'compareTournament');
        comp.compareTournament(entity, entity2);
        expect(tournamentService.compareTournament).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
