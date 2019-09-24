import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnDestroy {
  url:string = "/leads";
  $destroy:Subject<void> = new Subject();
  constructor(private router:Router) { 
    this.router.events.pipe(takeUntil(this.$destroy)).subscribe((event:Event)=>{
        if(event instanceof NavigationEnd){
          this.url = event.url;
        }
    })
  }

  ngOnDestroy(){
    this.$destroy.next();
    this.$destroy.complete();
    
  }
  
  ngOnInit() {
  }

}
