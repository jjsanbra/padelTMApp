import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISponsor } from '../sponsor.model';

@Component({
  standalone: true,
  selector: 'jhi-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SponsorDetailComponent {
  sponsor = input<ISponsor | null>(null);

  previousState(): void {
    window.history.back();
  }
}
