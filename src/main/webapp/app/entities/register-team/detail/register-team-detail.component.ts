import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IRegisterTeam } from '../register-team.model';

@Component({
  standalone: true,
  selector: 'jhi-register-team-detail',
  templateUrl: './register-team-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class RegisterTeamDetailComponent {
  registerTeam = input<IRegisterTeam | null>(null);

  previousState(): void {
    window.history.back();
  }
}
