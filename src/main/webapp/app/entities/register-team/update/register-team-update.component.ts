import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { RegisterTeamService } from '../service/register-team.service';
import { IRegisterTeam } from '../register-team.model';
import { RegisterTeamFormService, RegisterTeamFormGroup } from './register-team-form.service';

@Component({
  standalone: true,
  selector: 'jhi-register-team-update',
  templateUrl: './register-team-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RegisterTeamUpdateComponent implements OnInit {
  isSaving = false;
  registerTeam: IRegisterTeam | null = null;

  teamsSharedCollection: ITeam[] = [];
  tournamentsSharedCollection: ITournament[] = [];

  protected registerTeamService = inject(RegisterTeamService);
  protected registerTeamFormService = inject(RegisterTeamFormService);
  protected teamService = inject(TeamService);
  protected tournamentService = inject(TournamentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RegisterTeamFormGroup = this.registerTeamFormService.createRegisterTeamFormGroup();

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  compareTournament = (o1: ITournament | null, o2: ITournament | null): boolean => this.tournamentService.compareTournament(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ registerTeam }) => {
      this.registerTeam = registerTeam;
      if (registerTeam) {
        this.updateForm(registerTeam);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const registerTeam = this.registerTeamFormService.getRegisterTeam(this.editForm);
    if (registerTeam.id !== null) {
      this.subscribeToSaveResponse(this.registerTeamService.update(registerTeam));
    } else {
      this.subscribeToSaveResponse(this.registerTeamService.create(registerTeam));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegisterTeam>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(registerTeam: IRegisterTeam): void {
    this.registerTeam = registerTeam;
    this.registerTeamFormService.resetForm(this.editForm, registerTeam);

    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, registerTeam.team);
    this.tournamentsSharedCollection = this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(
      this.tournamentsSharedCollection,
      ...(registerTeam.tournaments ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.registerTeam?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    this.tournamentService
      .query()
      .pipe(map((res: HttpResponse<ITournament[]>) => res.body ?? []))
      .pipe(
        map((tournaments: ITournament[]) =>
          this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(tournaments, ...(this.registerTeam?.tournaments ?? [])),
        ),
      )
      .subscribe((tournaments: ITournament[]) => (this.tournamentsSharedCollection = tournaments));
  }
}
