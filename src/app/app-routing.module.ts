import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadsInfoComponent } from './components/leads-info/leads-info.component';
import { TimelineComponent } from './components/timeline/timeline.component';


const routes: Routes = [
  { path:'', redirectTo:'leads',pathMatch: 'full'},
  { path :'leads',component:LeadsComponent },
  { path :'lead/:id',component:LeadsInfoComponent },
  { path :'timeline',component:TimelineComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
