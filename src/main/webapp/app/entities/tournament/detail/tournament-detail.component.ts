import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITournament } from '../tournament.model';

@Component({
  standalone: true,
  selector: 'jhi-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TournamentDetailComponent {
  tournament = input<ITournament | null>(null);

  previousState(): void {
    window.history.back();
  }
}
