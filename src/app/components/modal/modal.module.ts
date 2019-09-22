import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { LeadModalComponent } from './lead-modal.component';



@NgModule({
  declarations: [LeadModalComponent],
  providers:[ModalService],
  imports: [
    CommonModule
  ],
  exports:[LeadModalComponent]
})
export class ModalModule { }
