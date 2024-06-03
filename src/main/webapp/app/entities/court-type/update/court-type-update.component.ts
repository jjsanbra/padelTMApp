import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { ICourtType } from '../court-type.model';
import { CourtTypeService } from '../service/court-type.service';
import { CourtTypeFormService, CourtTypeFormGroup } from './court-type-form.service';

@Component({
  standalone: true,
  selector: 'jhi-court-type-update',
  templateUrl: './court-type-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CourtTypeUpdateComponent implements OnInit {
  isSaving = false;
  courtType: ICourtType | null = null;

  tournamentsSharedCollection: ITournament[] = [];

  protected courtTypeService = inject(CourtTypeService);
  protected courtTypeFormService = inject(CourtTypeFormService);
  protected tournamentService = inject(TournamentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourtTypeFormGroup = this.courtTypeFormService.createCourtTypeFormGroup();

  compareTournament = (o1: ITournament | null, o2: ITournament | null): boolean => this.tournamentService.compareTournament(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courtType }) => {
      this.courtType = courtType;
      if (courtType) {
        this.updateForm(courtType);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courtType = this.courtTypeFormService.getCourtType(this.editForm);
    if (courtType.id !== null) {
      this.subscribeToSaveResponse(this.courtTypeService.update(courtType));
    } else {
      this.subscribeToSaveResponse(this.courtTypeService.create(courtType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourtType>>): void {
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

  protected updateForm(courtType: ICourtType): void {
    this.courtType = courtType;
    this.courtTypeFormService.resetForm(this.editForm, courtType);

    this.tournamentsSharedCollection = this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(
      this.tournamentsSharedCollection,
      ...(courtType.tournaments ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tournamentService
      .query()
      .pipe(map((res: HttpResponse<ITournament[]>) => res.body ?? []))
      .pipe(
        map((tournaments: ITournament[]) =>
          this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(tournaments, ...(this.courtType?.tournaments ?? [])),
        ),
      )
      .subscribe((tournaments: ITournament[]) => (this.tournamentsSharedCollection = tournaments));
  }
}
