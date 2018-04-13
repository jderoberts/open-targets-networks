import { NavbarComponent } from './../../../src/navbars/navbar.component';
import { NavbarService } from './../../../src/navbars/navbar.service';
import { LogoComponent } from './../../../src/navbars/logo.component';
import { LinksComponent } from './../../../src/navbars/links.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from '../../../src';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { DiseaseComponent } from './disease/disease.component';
import { DiseaseSummaryComponent } from './disease-summary/disease-summary.component';
import { SubnetworksQueueComponent } from './subnetworks-queue/subnetworks-queue.component';
import { SubnetworksSummaryComponent } from './subnetworks-summary/subnetworks-summary.component';
import { SubnetworksVisComponent } from './subnetworks-vis/subnetworks-vis.component';
import { SubnetworksComponent } from './subnetworks/subnetworks.component';
import { SubnetworksDefaultComponent } from './subnetworks-default/subnetworks-default.component';

import { EfoService } from './efo.service';
import { Hotnet2VersionService } from './hotnet2-version.service';
import { OtAssociationsService } from './ot-associations.service';
import { QueueService } from './queue.service';
import { Hotnet2ResultService } from './hotnet2-result.service';
import { EfoParentsService } from './efo-parents.service';
import { EfoChildrenService } from './efo-children.service';
import { VisComponent } from './vis/vis.component';
import { VisGraphComponent } from './vis-graph/vis-graph.component';
import { OtEvidenceService } from './ot-evidence.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    SearchComponent,
    DiseaseComponent,
    DiseaseSummaryComponent,
    SubnetworksSummaryComponent,
    SubnetworksVisComponent,
    SubnetworksQueueComponent,
    SubnetworksComponent,
    SubnetworksDefaultComponent,
    VisComponent,
    VisGraphComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [NavbarService, EfoService, Hotnet2VersionService, OtAssociationsService, QueueService, Hotnet2ResultService, EfoParentsService, EfoChildrenService, OtEvidenceService],
  bootstrap: [AppComponent],
  exports: [ NavbarComponent, LinksComponent, LogoComponent],
})
export class AppModule {
}
