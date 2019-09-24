import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';
import { first } from 'rxjs/operators';
import { Lead } from 'src/app/shared/interfaces/lead.interface';
import { ToastrService } from 'ngx-toastr';
import { InitTimeline, timeline } from 'src/app/shared/interfaces/timeline.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timeline:timeline[];
  months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  incomeToggle = "fullIncome";
  leads:Lead[];
  constructor(private leadService:LeadService,private _toastr:ToastrService) { }

  ngOnInit() {
    this.leadService.fetchLeads()
    .pipe(first())
    .subscribe((data: Lead[]) => {
      this.timeline = new InitTimeline(data).timeline;
      this.leads = data;
    }, (error) => {
      this._toastr.error(error.message, "Error Retrieving Leads!");
    });
  }

  toggleIncome(){
    this.incomeToggle = (this.incomeToggle === "fullIncome" ? "weightedIncome":"fullIncome");
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drag(e) {
    // Todo: add Classname border-red on drag start
  }

  async drop(line:timeline,direction:number,index:number) {
    let newStartDate = new Date(this.timeline[index].lead.startDate);
    newStartDate.setMonth(line.startMonth+direction);
    line.lead.startDate = newStartDate;
    this.timeline[index] = new InitTimeline([line.lead]).timeline[0];
    try {
      line.lead = await this.leadService.createLead(line.lead).toPromise();
    } catch (e) {
      this._toastr.error(e.message, "Error Saving Lead!");
      return;
    }
  }


}
