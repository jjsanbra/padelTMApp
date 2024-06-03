import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICourtType } from '../court-type.model';
import { CourtTypeService } from '../service/court-type.service';

@Component({
  standalone: true,
  templateUrl: './court-type-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CourtTypeDeleteDialogComponent {
  courtType?: ICourtType;

  protected courtTypeService = inject(CourtTypeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.courtTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
