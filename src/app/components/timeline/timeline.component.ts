import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';
import { first } from 'rxjs/operators';
import { ILead } from 'src/app/shared/interfaces/lead.interface';
import { ToastrService } from 'ngx-toastr';
import { InitTimeline, calcFullIncome, calcWeightedIncome } from 'src/app/shared/interfaces/timeline.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timeline:Array<any> = [];
  months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  incomeToggle = "fullIncome";
  constructor(private leadService:LeadService,private _toastr:ToastrService) { }

  ngOnInit() {
    this.leadService.fetchLeads()
    .pipe(first())
    .subscribe((data: ILead[]) => {
      this.timeline = new InitTimeline(data).timeline;
      console.log("Timeline",this.timeline)
    }, (error) => {
      this._toastr.error(error.message, "Error Retrieving Leads!");
    });
  }

  toggleIncome(){
    this.incomeToggle = (this.incomeToggle === "fullIncome" ? "weightedIncome":"fullIncome");
  }

  updateIncome(event){
    this.timeline.map((line)=>{
      if(line.leads.length){
        line.fullIncome = calcFullIncome(line.leads),
        line.weightedIncome = calcWeightedIncome(line.leads)
      }else{
        line.fullIncome = 0;
        line.weightedIncome = 0;
      }
      return line;
    });

  }

}
