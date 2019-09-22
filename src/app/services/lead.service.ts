import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ILead } from '../shared/interfaces/lead.interface';


@Injectable()
export class LeadService {
  headers:HttpHeaders = new HttpHeaders();
  constructor(private http:HttpClient) {
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('X-Parse-Application-Id', `${environment.appId}`);
  }

  fetchLeads():Observable<any>{
    return this.http.get(environment.apiUrl + 'leads',{headers:this.headers});
  }

  createLead(lead:ILead):Observable<any>{
    return this.http.post(environment.apiUrl + 'lead',lead,{headers:this.headers})
  }

}
