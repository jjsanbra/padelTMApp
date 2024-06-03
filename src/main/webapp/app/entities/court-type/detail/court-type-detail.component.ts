import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICourtType } from '../court-type.model';

@Component({
  standalone: true,
  selector: 'jhi-court-type-detail',
  templateUrl: './court-type-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CourtTypeDetailComponent {
  courtType = input<ICourtType | null>(null);

  previousState(): void {
    window.history.back();
  }
}
