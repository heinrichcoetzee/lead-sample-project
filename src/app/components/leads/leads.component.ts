import { Component, OnInit } from '@angular/core';
import { Lanes, initLanes } from 'src/app/shared/interfaces/lanes.interface';
import { Lead, InitLead } from 'src/app/shared/interfaces/lead.interface';
import { ModalService } from '../modal/modal.service';
import { LeadService } from 'src/app/services/lead.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  lanes: Lanes[];
  openedLead: Lead;
  savingLead: boolean = false;
  constructor(private modalService: ModalService, private leadService: LeadService, private _toastr: ToastrService) { }

  ngOnInit() {

    this.leadService.fetchStages(5)
      .pipe(first())
      .subscribe((data: Lanes[]) => {
        this.lanes = data;
      }, (error) => {
        this._toastr.error(error.message, "Error Retrieving Leads!");
      });
  }

  openLead(lead: Lead) {
    this.openedLead = lead;
    this.modalService.open('lead-edit-modal');
  }

  addLead() {
    this.openedLead = new InitLead();
    this.modalService.open('lead-edit-modal');
  }

  modelChange(event, stage: number) {
    const lead:Lead = event.value;
    lead.stage = stage;
    this.leadService.createLead(lead)
      .pipe(first())
      .subscribe((result) => {
        console.log("Lead Stage Updated - ", result);
      }, (error) => {
        this._toastr.error(error.message, "Error While Updating Stage!");
      });
  }

  async saveLead() {
    this.savingLead = true;
    try {
      this.openedLead = await this.leadService.createLead(this.openedLead).toPromise();
    } catch (e) {
      this.savingLead = false;
      this._toastr.error(e.error.message, "Error Saving Lead!");
      return;
    }

    let findLane = this.lanes.findIndex((lane) => lane.stage === this.openedLead.stage);
    let findLead = this.lanes[findLane].leads.findIndex((lane) => lane.objectId === this.openedLead.objectId);
    if (findLead > -1) {
      this.lanes[findLane].leads[findLead] = this.openedLead;
    } else {
      this.lanes[findLane].leads.push(this.openedLead);
    }
    this.modalService.close('lead-edit-modal');
    this.savingLead = false;
  }

  closeModal(){
    this.openedLead = undefined;
    this.modalService.close('lead-edit-modal');
  }

}
