import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fab-util-modal-leave-yes-no',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Confirmation</h4>
    </div>
    <div class="modal-body">
      <p>You have made edits on this page that were not saved.</p>
      <p>Are you sure you want to leave this page?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `,
})
export class ModalLeaveYesNoComponent {
  constructor(public modal: NgbActiveModal) {}
}
