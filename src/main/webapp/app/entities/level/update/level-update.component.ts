import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { LevelEnum } from 'app/entities/enumerations/level-enum.model';
import { LevelService } from '../service/level.service';
import { ILevel } from '../level.model';
import { LevelFormService, LevelFormGroup } from './level-form.service';

@Component({
  standalone: true,
  selector: 'jhi-level-update',
  templateUrl: './level-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LevelUpdateComponent implements OnInit {
  isSaving = false;
  level: ILevel | null = null;
  levelEnumValues = Object.keys(LevelEnum);

  tournamentsSharedCollection: ITournament[] = [];

  protected levelService = inject(LevelService);
  protected levelFormService = inject(LevelFormService);
  protected tournamentService = inject(TournamentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LevelFormGroup = this.levelFormService.createLevelFormGroup();

  compareTournament = (o1: ITournament | null, o2: ITournament | null): boolean => this.tournamentService.compareTournament(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ level }) => {
      this.level = level;
      if (level) {
        this.updateForm(level);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const level = this.levelFormService.getLevel(this.editForm);
    if (level.id !== null) {
      this.subscribeToSaveResponse(this.levelService.update(level));
    } else {
      this.subscribeToSaveResponse(this.levelService.create(level));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevel>>): void {
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

  protected updateForm(level: ILevel): void {
    this.level = level;
    this.levelFormService.resetForm(this.editForm, level);

    this.tournamentsSharedCollection = this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(
      this.tournamentsSharedCollection,
      ...(level.tournaments ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tournamentService
      .query()
      .pipe(map((res: HttpResponse<ITournament[]>) => res.body ?? []))
      .pipe(
        map((tournaments: ITournament[]) =>
          this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(tournaments, ...(this.level?.tournaments ?? [])),
        ),
      )
      .subscribe((tournaments: ITournament[]) => (this.tournamentsSharedCollection = tournaments));
  }
}
