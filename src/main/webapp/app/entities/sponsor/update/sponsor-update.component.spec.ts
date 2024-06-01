import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { SponsorService } from '../service/sponsor.service';
import { ISponsor } from '../sponsor.model';
import { SponsorFormService } from './sponsor-form.service';

import { SponsorUpdateComponent } from './sponsor-update.component';

describe('Sponsor Management Update Component', () => {
  let comp: SponsorUpdateComponent;
  let fixture: ComponentFixture<SponsorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sponsorFormService: SponsorFormService;
  let sponsorService: SponsorService;
  let tournamentService: TournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SponsorUpdateComponent],
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
      .overrideTemplate(SponsorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SponsorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sponsorFormService = TestBed.inject(SponsorFormService);
    sponsorService = TestBed.inject(SponsorService);
    tournamentService = TestBed.inject(TournamentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Tournament query and add missing value', () => {
      const sponsor: ISponsor = { id: 456 };
      const tournaments: ITournament[] = [{ id: 4041 }];
      sponsor.tournaments = tournaments;

      const tournamentCollection: ITournament[] = [{ id: 10528 }];
      jest.spyOn(tournamentService, 'query').mockReturnValue(of(new HttpResponse({ body: tournamentCollection })));
      const additionalTournaments = [...tournaments];
      const expectedCollection: ITournament[] = [...additionalTournaments, ...tournamentCollection];
      jest.spyOn(tournamentService, 'addTournamentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sponsor });
      comp.ngOnInit();

      expect(tournamentService.query).toHaveBeenCalled();
      expect(tournamentService.addTournamentToCollectionIfMissing).toHaveBeenCalledWith(
        tournamentCollection,
        ...additionalTournaments.map(expect.objectContaining),
      );
      expect(comp.tournamentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sponsor: ISponsor = { id: 456 };
      const tournaments: ITournament = { id: 1612 };
      sponsor.tournaments = [tournaments];

      activatedRoute.data = of({ sponsor });
      comp.ngOnInit();

      expect(comp.tournamentsSharedCollection).toContain(tournaments);
      expect(comp.sponsor).toEqual(sponsor);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISponsor>>();
      const sponsor = { id: 123 };
      jest.spyOn(sponsorFormService, 'getSponsor').mockReturnValue(sponsor);
      jest.spyOn(sponsorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sponsor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sponsor }));
      saveSubject.complete();

      // THEN
      expect(sponsorFormService.getSponsor).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sponsorService.update).toHaveBeenCalledWith(expect.objectContaining(sponsor));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISponsor>>();
      const sponsor = { id: 123 };
      jest.spyOn(sponsorFormService, 'getSponsor').mockReturnValue({ id: null });
      jest.spyOn(sponsorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sponsor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sponsor }));
      saveSubject.complete();

      // THEN
      expect(sponsorFormService.getSponsor).toHaveBeenCalled();
      expect(sponsorService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISponsor>>();
      const sponsor = { id: 123 };
      jest.spyOn(sponsorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sponsor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sponsorService.update).toHaveBeenCalled();
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
