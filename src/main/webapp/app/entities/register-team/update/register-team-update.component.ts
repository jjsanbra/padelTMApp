import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IRegisterTeam } from '../register-team.model';
import { RegisterTeamService } from '../service/register-team.service';
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

  protected registerTeamService = inject(RegisterTeamService);
  protected registerTeamFormService = inject(RegisterTeamFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RegisterTeamFormGroup = this.registerTeamFormService.createRegisterTeamFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ registerTeam }) => {
      this.registerTeam = registerTeam;
      if (registerTeam) {
        this.updateForm(registerTeam);
      }
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
  }
}
