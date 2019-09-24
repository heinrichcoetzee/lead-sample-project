import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lead, InitLead } from 'src/app/shared/interfaces/lead.interface';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {
  @Input() lead:Lead = new InitLead();
  @Output() save:EventEmitter<Lead> = new EventEmitter();
  stages = [1,2,3,4,5];
  startDate:NgbDate;
  constructor(private _toastr:ToastrService) { }

  ngOnInit() {
    this.startDate = new NgbDate(
      new Date(this.lead.startDate).getFullYear(),
      new Date(this.lead.startDate).getMonth()+1,
      new Date(this.lead.startDate).getDate()
    );

  }

  saveLead(saveLead:NgForm){
    if(!this.lead.name){
      this._toastr.warning("Please give the lead a name","Validation Error");
    }else if(saveLead.invalid){
      this._toastr.warning("Pleae complete the lead details","Validation Error");
    }else{
      this.save.emit(this.lead);
    }
  }

  dateChange(){
      const year = this.startDate['year'];
      const month = this.startDate['month'];
      const day = this.startDate['day'];
      this.lead.startDate = new Date(year,month,day);
  }

}
