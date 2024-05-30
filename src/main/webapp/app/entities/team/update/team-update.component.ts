import { Component, inject, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlayer } from 'app/entities/player/player.model';
import { PlayerService } from 'app/entities/player/service/player.service';
import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { LevelEnum } from 'app/entities/enumerations/level-enum.model';
import { CategoryEnum } from 'app/entities/enumerations/category-enum.model';
import { TeamService } from '../service/team.service';
import { ITeam } from '../team.model';
import { TeamFormService, TeamFormGroup } from './team-form.service';

@Component({
  standalone: true,
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  team: ITeam | null = null;
  levelEnumValues = Object.keys(LevelEnum);
  categoryEnumValues = Object.keys(CategoryEnum);

  playersSharedCollection: IPlayer[] = [];
  tournamentsSharedCollection: ITournament[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected teamService = inject(TeamService);
  protected teamFormService = inject(TeamFormService);
  protected playerService = inject(PlayerService);
  protected tournamentService = inject(TournamentService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TeamFormGroup = this.teamFormService.createTeamFormGroup();

  comparePlayer = (o1: IPlayer | null, o2: IPlayer | null): boolean => this.playerService.comparePlayer(o1, o2);

  compareTournament = (o1: ITournament | null, o2: ITournament | null): boolean => this.tournamentService.compareTournament(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.team = team;
      if (team) {
        this.updateForm(team);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('padelTmApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const team = this.teamFormService.getTeam(this.editForm);
    if (team.id !== null) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
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

  protected updateForm(team: ITeam): void {
    this.team = team;
    this.teamFormService.resetForm(this.editForm, team);

    this.playersSharedCollection = this.playerService.addPlayerToCollectionIfMissing<IPlayer>(
      this.playersSharedCollection,
      ...(team.players ?? []),
    );
    this.tournamentsSharedCollection = this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(
      this.tournamentsSharedCollection,
      ...(team.tournaments ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.playerService
      .query()
      .pipe(map((res: HttpResponse<IPlayer[]>) => res.body ?? []))
      .pipe(map((players: IPlayer[]) => this.playerService.addPlayerToCollectionIfMissing<IPlayer>(players, ...(this.team?.players ?? []))))
      .subscribe((players: IPlayer[]) => (this.playersSharedCollection = players));

    this.tournamentService
      .query()
      .pipe(map((res: HttpResponse<ITournament[]>) => res.body ?? []))
      .pipe(
        map((tournaments: ITournament[]) =>
          this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(tournaments, ...(this.team?.tournaments ?? [])),
        ),
      )
      .subscribe((tournaments: ITournament[]) => (this.tournamentsSharedCollection = tournaments));
  }
}
