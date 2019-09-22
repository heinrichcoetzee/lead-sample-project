import { Component, OnInit } from '@angular/core';
import { Lanes, initLanes } from 'src/app/shared/interfaces/lanes.interface';
import { ILead, InitLead } from 'src/app/shared/interfaces/lead.interface';
import { ModalService } from '../modal/modal.service';
import { LeadService } from 'src/app/services/lead.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  lanes:Lanes[];
  openedLead:ILead;
  savingLead:boolean = false;
  constructor(private modalService:ModalService,private leadService:LeadService) { }

  ngOnInit() {
   
    this.leadService.fetchLeads()
    .pipe(first()).
    subscribe((data:ILead[])=>{
      this.lanes = new initLanes(5,data).stages; 
      console.log(this.lanes);
    })
  }

  openLead(lead:ILead){
    this.openedLead = lead;
    this.modalService.open('lead-edit-modal');
  }

  addLead(){
    this.openedLead = new InitLead();
    this.modalService.open('lead-edit-modal');
  }

  modelChange(event,stage:number){
    console.log(event);
    console.log(stage);
    const lead:ILead = event.value;
    lead.stage = stage;
    this.leadService.createLead(lead).pipe(first())
    .subscribe((result)=>{
      console.log("Updated")
    });
  }

  async saveLead(){
    this.savingLead = true;
    try{
    this.openedLead = await this.leadService.createLead(this.openedLead).toPromise();
    }catch{
      this.savingLead = false;
      return;
    }

      let findLane = this.lanes.findIndex((lane)=>lane.stage===this.openedLead.stage);
      let findLead = this.lanes[findLane].leads.findIndex((lane)=>lane.objectId===this.openedLead.objectId);
      if(findLead > -1){
        this.lanes[findLane].leads[findLead] = this.openedLead;
      }else{
        this.lanes[findLane].leads.push(this.openedLead);
      }
      this.modalService.close('lead-edit-modal');
      this.savingLead = false;
  }

}
