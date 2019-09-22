import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss']
})
export class LoaderOverlayComponent implements OnChanges {
  @Input() message:string = "";
  @Input() saving:boolean;
  constructor() { }

  ngOnChanges() {
  }

}
