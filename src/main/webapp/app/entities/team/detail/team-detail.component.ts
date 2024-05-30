import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITeam } from '../team.model';

@Component({
  standalone: true,
  selector: 'jhi-team-detail',
  templateUrl: './team-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TeamDetailComponent {
  team = input<ITeam | null>(null);

  previousState(): void {
    window.history.back();
  }
}
