import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Lead } from '../shared/interfaces/lead.interface';
import { catchError } from 'rxjs/operators';


@Injectable()
export class LeadService {
  headers:HttpHeaders = new HttpHeaders();
  constructor(private http:HttpClient) {
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('X-Parse-Application-Id', `${environment.appId}`);
  }

  fetchStages(columns:number):Observable<any>{
    return this.http.get(environment.apiUrl + 'stages/'+ columns,{headers:this.headers})
    .pipe(
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  fetchLeads():Observable<any>{
    return this.http.get(environment.apiUrl + 'leads',{headers:this.headers})
    .pipe(
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  createLead(lead:Lead):Observable<any>{
    return this.http.post(environment.apiUrl + 'lead',lead,{headers:this.headers})
    .pipe(
      catchError(err => {
        return throwError(err.error);
      })
    )
  }

}
