import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { IRegisterTeam } from '../register-team.model';
import { RegisterTeamService } from '../service/register-team.service';
import { RegisterTeamFormService } from './register-team-form.service';

import { RegisterTeamUpdateComponent } from './register-team-update.component';

describe('RegisterTeam Management Update Component', () => {
  let comp: RegisterTeamUpdateComponent;
  let fixture: ComponentFixture<RegisterTeamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let registerTeamFormService: RegisterTeamFormService;
  let registerTeamService: RegisterTeamService;
  let teamService: TeamService;
  let tournamentService: TournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RegisterTeamUpdateComponent],
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
      .overrideTemplate(RegisterTeamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegisterTeamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    registerTeamFormService = TestBed.inject(RegisterTeamFormService);
    registerTeamService = TestBed.inject(RegisterTeamService);
    teamService = TestBed.inject(TeamService);
    tournamentService = TestBed.inject(TournamentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Team query and add missing value', () => {
      const registerTeam: IRegisterTeam = { id: 456 };
      const team: ITeam = { id: 16933 };
      registerTeam.team = team;

      const teamCollection: ITeam[] = [{ id: 8489 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tournament query and add missing value', () => {
      const registerTeam: IRegisterTeam = { id: 456 };
      const tournaments: ITournament[] = [{ id: 13900 }];
      registerTeam.tournaments = tournaments;

      const tournamentCollection: ITournament[] = [{ id: 13576 }];
      jest.spyOn(tournamentService, 'query').mockReturnValue(of(new HttpResponse({ body: tournamentCollection })));
      const additionalTournaments = [...tournaments];
      const expectedCollection: ITournament[] = [...additionalTournaments, ...tournamentCollection];
      jest.spyOn(tournamentService, 'addTournamentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      expect(tournamentService.query).toHaveBeenCalled();
      expect(tournamentService.addTournamentToCollectionIfMissing).toHaveBeenCalledWith(
        tournamentCollection,
        ...additionalTournaments.map(expect.objectContaining),
      );
      expect(comp.tournamentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const registerTeam: IRegisterTeam = { id: 456 };
      const team: ITeam = { id: 28483 };
      registerTeam.team = team;
      const tournaments: ITournament = { id: 14376 };
      registerTeam.tournaments = [tournaments];

      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.tournamentsSharedCollection).toContain(tournaments);
      expect(comp.registerTeam).toEqual(registerTeam);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegisterTeam>>();
      const registerTeam = { id: 123 };
      jest.spyOn(registerTeamFormService, 'getRegisterTeam').mockReturnValue(registerTeam);
      jest.spyOn(registerTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: registerTeam }));
      saveSubject.complete();

      // THEN
      expect(registerTeamFormService.getRegisterTeam).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(registerTeamService.update).toHaveBeenCalledWith(expect.objectContaining(registerTeam));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegisterTeam>>();
      const registerTeam = { id: 123 };
      jest.spyOn(registerTeamFormService, 'getRegisterTeam').mockReturnValue({ id: null });
      jest.spyOn(registerTeamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registerTeam: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: registerTeam }));
      saveSubject.complete();

      // THEN
      expect(registerTeamFormService.getRegisterTeam).toHaveBeenCalled();
      expect(registerTeamService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegisterTeam>>();
      const registerTeam = { id: 123 };
      jest.spyOn(registerTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(registerTeamService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
