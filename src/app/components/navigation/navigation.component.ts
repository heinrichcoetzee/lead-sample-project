import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  url:string;
  constructor(private router:Router) { 
    this.router.events.subscribe((event:Event)=>{
        if(event instanceof NavigationEnd){
          this.url = event.url ;
          console.log(this.url)
        }
    })
  }

  ngOnInit() {
  }

}
