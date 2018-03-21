import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent }   from './home/home.component';
import { SearchComponent }      from './search/search.component';
import { AboutComponent }  from './about/about.component';
import { DiseaseComponent } from './disease/disease.component';
import { SubnetworksComponent } from './subnetworks/subnetworks.component';
import { SubnetworksDefaultComponent } from './subnetworks-default/subnetworks-default.component'; 

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search/:param', component: SearchComponent },
  { path: 'disease/:disease', component: DiseaseComponent, 
    children: [ { path: '', component: SubnetworksDefaultComponent, pathMatch: 'full'},
        { path:':network', component: SubnetworksComponent }] },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
