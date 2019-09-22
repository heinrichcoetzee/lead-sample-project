import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  template:`
  <div class="w-100">
  <div class="spinner"></div>
</div>`
})
export class LoaderSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
