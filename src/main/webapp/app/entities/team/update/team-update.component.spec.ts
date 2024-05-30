import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IPlayer } from 'app/entities/player/player.model';
import { PlayerService } from 'app/entities/player/service/player.service';
import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { ITeam } from '../team.model';
import { TeamService } from '../service/team.service';
import { TeamFormService } from './team-form.service';

import { TeamUpdateComponent } from './team-update.component';

describe('Team Management Update Component', () => {
  let comp: TeamUpdateComponent;
  let fixture: ComponentFixture<TeamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teamFormService: TeamFormService;
  let teamService: TeamService;
  let playerService: PlayerService;
  let tournamentService: TournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TeamUpdateComponent],
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
      .overrideTemplate(TeamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teamFormService = TestBed.inject(TeamFormService);
    teamService = TestBed.inject(TeamService);
    playerService = TestBed.inject(PlayerService);
    tournamentService = TestBed.inject(TournamentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Player query and add missing value', () => {
      const team: ITeam = { id: 456 };
      const players: IPlayer[] = [{ id: 10784 }];
      team.players = players;

      const playerCollection: IPlayer[] = [{ id: 8482 }];
      jest.spyOn(playerService, 'query').mockReturnValue(of(new HttpResponse({ body: playerCollection })));
      const additionalPlayers = [...players];
      const expectedCollection: IPlayer[] = [...additionalPlayers, ...playerCollection];
      jest.spyOn(playerService, 'addPlayerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ team });
      comp.ngOnInit();

      expect(playerService.query).toHaveBeenCalled();
      expect(playerService.addPlayerToCollectionIfMissing).toHaveBeenCalledWith(
        playerCollection,
        ...additionalPlayers.map(expect.objectContaining),
      );
      expect(comp.playersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Tournament query and add missing value', () => {
      const team: ITeam = { id: 456 };
      const tournaments: ITournament[] = [{ id: 5002 }];
      team.tournaments = tournaments;

      const tournamentCollection: ITournament[] = [{ id: 30543 }];
      jest.spyOn(tournamentService, 'query').mockReturnValue(of(new HttpResponse({ body: tournamentCollection })));
      const additionalTournaments = [...tournaments];
      const expectedCollection: ITournament[] = [...additionalTournaments, ...tournamentCollection];
      jest.spyOn(tournamentService, 'addTournamentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ team });
      comp.ngOnInit();

      expect(tournamentService.query).toHaveBeenCalled();
      expect(tournamentService.addTournamentToCollectionIfMissing).toHaveBeenCalledWith(
        tournamentCollection,
        ...additionalTournaments.map(expect.objectContaining),
      );
      expect(comp.tournamentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const team: ITeam = { id: 456 };
      const player: IPlayer = { id: 30937 };
      team.players = [player];
      const tournaments: ITournament = { id: 9187 };
      team.tournaments = [tournaments];

      activatedRoute.data = of({ team });
      comp.ngOnInit();

      expect(comp.playersSharedCollection).toContain(player);
      expect(comp.tournamentsSharedCollection).toContain(tournaments);
      expect(comp.team).toEqual(team);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeam>>();
      const team = { id: 123 };
      jest.spyOn(teamFormService, 'getTeam').mockReturnValue(team);
      jest.spyOn(teamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ team });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: team }));
      saveSubject.complete();

      // THEN
      expect(teamFormService.getTeam).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(teamService.update).toHaveBeenCalledWith(expect.objectContaining(team));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeam>>();
      const team = { id: 123 };
      jest.spyOn(teamFormService, 'getTeam').mockReturnValue({ id: null });
      jest.spyOn(teamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ team: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: team }));
      saveSubject.complete();

      // THEN
      expect(teamFormService.getTeam).toHaveBeenCalled();
      expect(teamService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeam>>();
      const team = { id: 123 };
      jest.spyOn(teamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ team });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teamService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePlayer', () => {
      it('Should forward to playerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(playerService, 'comparePlayer');
        comp.comparePlayer(entity, entity2);
        expect(playerService.comparePlayer).toHaveBeenCalledWith(entity, entity2);
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
