import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITournament } from 'app/entities/tournament/tournament.model';
import { TournamentService } from 'app/entities/tournament/service/tournament.service';
import { ISponsor } from '../sponsor.model';
import { SponsorService } from '../service/sponsor.service';
import { SponsorFormService, SponsorFormGroup } from './sponsor-form.service';

@Component({
  standalone: true,
  selector: 'jhi-sponsor-update',
  templateUrl: './sponsor-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SponsorUpdateComponent implements OnInit {
  isSaving = false;
  sponsor: ISponsor | null = null;

  tournamentsSharedCollection: ITournament[] = [];

  protected sponsorService = inject(SponsorService);
  protected sponsorFormService = inject(SponsorFormService);
  protected tournamentService = inject(TournamentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SponsorFormGroup = this.sponsorFormService.createSponsorFormGroup();

  compareTournament = (o1: ITournament | null, o2: ITournament | null): boolean => this.tournamentService.compareTournament(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sponsor }) => {
      this.sponsor = sponsor;
      if (sponsor) {
        this.updateForm(sponsor);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sponsor = this.sponsorFormService.getSponsor(this.editForm);
    if (sponsor.id !== null) {
      this.subscribeToSaveResponse(this.sponsorService.update(sponsor));
    } else {
      this.subscribeToSaveResponse(this.sponsorService.create(sponsor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISponsor>>): void {
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

  protected updateForm(sponsor: ISponsor): void {
    this.sponsor = sponsor;
    this.sponsorFormService.resetForm(this.editForm, sponsor);

    this.tournamentsSharedCollection = this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(
      this.tournamentsSharedCollection,
      ...(sponsor.tournaments ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tournamentService
      .query()
      .pipe(map((res: HttpResponse<ITournament[]>) => res.body ?? []))
      .pipe(
        map((tournaments: ITournament[]) =>
          this.tournamentService.addTournamentToCollectionIfMissing<ITournament>(tournaments, ...(this.sponsor?.tournaments ?? [])),
        ),
      )
      .subscribe((tournaments: ITournament[]) => (this.tournamentsSharedCollection = tournaments));
  }
}
