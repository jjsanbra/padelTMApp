import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITournament } from '../tournament.model';
import { TournamentService } from '../service/tournament.service';

@Component({
  standalone: true,
  templateUrl: './tournament-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TournamentDeleteDialogComponent {
  tournament?: ITournament;

  protected tournamentService = inject(TournamentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tournamentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
