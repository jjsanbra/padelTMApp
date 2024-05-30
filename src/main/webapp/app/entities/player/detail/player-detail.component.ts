import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IPlayer } from '../player.model';

@Component({
  standalone: true,
  selector: 'jhi-player-detail',
  templateUrl: './player-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class PlayerDetailComponent {
  player = input<IPlayer | null>(null);

  previousState(): void {
    window.history.back();
  }
}
