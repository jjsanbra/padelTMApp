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
import { ISponsor } from 'app/entities/sponsor/sponsor.model';
import { SponsorService } from 'app/entities/sponsor/service/sponsor.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { ILevel } from 'app/entities/level/level.model';
import { LevelService } from 'app/entities/level/service/level.service';
import { ICourtType } from 'app/entities/court-type/court-type.model';
import { CourtTypeService } from 'app/entities/court-type/service/court-type.service';
import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';
import { TournamentService } from '../service/tournament.service';
import { ITournament } from '../tournament.model';
import { TournamentFormService, TournamentFormGroup } from './tournament-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tournament-update',
  templateUrl: './tournament-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TournamentUpdateComponent implements OnInit {
  isSaving = false;
  tournament: ITournament | null = null;

  sponsorsSharedCollection: ISponsor[] = [];
  teamsSharedCollection: ITeam[] = [];
  categoriesSharedCollection: ICategory[] = [];
  levelsSharedCollection: ILevel[] = [];
  courtTypesSharedCollection: ICourtType[] = [];
  locationsSharedCollection: ILocation[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected tournamentService = inject(TournamentService);
  protected tournamentFormService = inject(TournamentFormService);
  protected sponsorService = inject(SponsorService);
  protected teamService = inject(TeamService);
  protected categoryService = inject(CategoryService);
  protected levelService = inject(LevelService);
  protected courtTypeService = inject(CourtTypeService);
  protected locationService = inject(LocationService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TournamentFormGroup = this.tournamentFormService.createTournamentFormGroup();

  compareSponsor = (o1: ISponsor | null, o2: ISponsor | null): boolean => this.sponsorService.compareSponsor(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  compareCategory = (o1: ICategory | null, o2: ICategory | null): boolean => this.categoryService.compareCategory(o1, o2);

  compareLevel = (o1: ILevel | null, o2: ILevel | null): boolean => this.levelService.compareLevel(o1, o2);

  compareCourtType = (o1: ICourtType | null, o2: ICourtType | null): boolean => this.courtTypeService.compareCourtType(o1, o2);

  compareLocation = (o1: ILocation | null, o2: ILocation | null): boolean => this.locationService.compareLocation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tournament }) => {
      this.tournament = tournament;
      if (tournament) {
        this.updateForm(tournament);
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
    const tournament = this.tournamentFormService.getTournament(this.editForm);
    if (tournament.id !== null) {
      this.subscribeToSaveResponse(this.tournamentService.update(tournament));
    } else {
      this.subscribeToSaveResponse(this.tournamentService.create(tournament));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITournament>>): void {
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

  protected updateForm(tournament: ITournament): void {
    this.tournament = tournament;
    this.tournamentFormService.resetForm(this.editForm, tournament);

    this.sponsorsSharedCollection = this.sponsorService.addSponsorToCollectionIfMissing<ISponsor>(
      this.sponsorsSharedCollection,
      ...(tournament.sponsors ?? []),
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(
      this.teamsSharedCollection,
      ...(tournament.teams ?? []),
    );
    this.categoriesSharedCollection = this.categoryService.addCategoryToCollectionIfMissing<ICategory>(
      this.categoriesSharedCollection,
      ...(tournament.categories ?? []),
    );
    this.levelsSharedCollection = this.levelService.addLevelToCollectionIfMissing<ILevel>(
      this.levelsSharedCollection,
      ...(tournament.levels ?? []),
    );
    this.courtTypesSharedCollection = this.courtTypeService.addCourtTypeToCollectionIfMissing<ICourtType>(
      this.courtTypesSharedCollection,
      ...(tournament.courtTypes ?? []),
    );
    this.locationsSharedCollection = this.locationService.addLocationToCollectionIfMissing<ILocation>(
      this.locationsSharedCollection,
      tournament.location,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.sponsorService
      .query()
      .pipe(map((res: HttpResponse<ISponsor[]>) => res.body ?? []))
      .pipe(
        map((sponsors: ISponsor[]) =>
          this.sponsorService.addSponsorToCollectionIfMissing<ISponsor>(sponsors, ...(this.tournament?.sponsors ?? [])),
        ),
      )
      .subscribe((sponsors: ISponsor[]) => (this.sponsorsSharedCollection = sponsors));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, ...(this.tournament?.teams ?? []))))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    this.categoryService
      .query()
      .pipe(map((res: HttpResponse<ICategory[]>) => res.body ?? []))
      .pipe(
        map((categories: ICategory[]) =>
          this.categoryService.addCategoryToCollectionIfMissing<ICategory>(categories, ...(this.tournament?.categories ?? [])),
        ),
      )
      .subscribe((categories: ICategory[]) => (this.categoriesSharedCollection = categories));

    this.levelService
      .query()
      .pipe(map((res: HttpResponse<ILevel[]>) => res.body ?? []))
      .pipe(map((levels: ILevel[]) => this.levelService.addLevelToCollectionIfMissing<ILevel>(levels, ...(this.tournament?.levels ?? []))))
      .subscribe((levels: ILevel[]) => (this.levelsSharedCollection = levels));

    this.courtTypeService
      .query()
      .pipe(map((res: HttpResponse<ICourtType[]>) => res.body ?? []))
      .pipe(
        map((courtTypes: ICourtType[]) =>
          this.courtTypeService.addCourtTypeToCollectionIfMissing<ICourtType>(courtTypes, ...(this.tournament?.courtTypes ?? [])),
        ),
      )
      .subscribe((courtTypes: ICourtType[]) => (this.courtTypesSharedCollection = courtTypes));

    this.locationService
      .query()
      .pipe(map((res: HttpResponse<ILocation[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocation[]) =>
          this.locationService.addLocationToCollectionIfMissing<ILocation>(locations, this.tournament?.location),
        ),
      )
      .subscribe((locations: ILocation[]) => (this.locationsSharedCollection = locations));
  }
}
