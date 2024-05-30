import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILevel } from '../level.model';

@Component({
  standalone: true,
  selector: 'jhi-level-detail',
  templateUrl: './level-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LevelDetailComponent {
  level = input<ILevel | null>(null);

  previousState(): void {
    window.history.back();
  }
}
