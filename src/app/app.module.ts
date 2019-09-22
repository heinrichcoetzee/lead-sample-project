import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsInfoComponent } from './components/leads-info/leads-info.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StagePipe } from './shared/pipes/stage.pipe';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import { ModalModule } from './components/modal/modal.module';
import { LeadFormComponent } from './components/leads-info/lead-form/lead-form.component';
import { LeadService } from './services/lead.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderSpinnerComponent } from './components/loaders/loader-spinner/loader-spinner.component';
import { LoaderOverlayComponent } from './components/loaders/loader-overlay/loader-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadsComponent,
    LeadsInfoComponent,
    TimelineComponent,
    NavigationComponent,
    StagePipe,
    LeadFormComponent,
    LoaderSpinnerComponent,
    LoaderOverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDnDModule.forRoot(),
    ModalModule,
    NgbDatepickerModule
  ],
  providers: [LeadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
