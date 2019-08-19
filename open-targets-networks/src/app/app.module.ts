import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { DiseaseComponent } from './disease/disease.component';
import { DiseaseSummaryComponent } from './disease-summary/disease-summary.component';
import { SubnetworksComponent } from './subnetworks/subnetworks.component';
import { SubnetworksDefaultComponent } from './subnetworks-default/subnetworks-default.component';
import { SubnetworksQueueComponent } from './subnetworks-queue/subnetworks-queue.component';
import { SubnetworksSummaryComponent } from './subnetworks-summary/subnetworks-summary.component';
import { SubnetworksResultComponent } from './subnetworks-result/subnetworks-result.component';
import { SubnetworksVisComponent } from './subnetworks-vis/subnetworks-vis.component';
import { SubnetworksResultDrugsComponent } from './subnetworks-result-drugs/subnetworks-result-drugs.component';
import { SubnetworksResultGenesComponent } from './subnetworks-result-genes/subnetworks-result-genes.component';
import { SubnetworksVisDetailsComponent } from './subnetworks-vis-details/subnetworks-vis-details.component';

import { EfoService } from './efo.service';
import { EfoParentsService } from './efo-parents.service';
import { EfoChildrenService } from './efo-children.service';
import { Hotnet2VersionService } from './hotnet2-version.service';
import { Hotnet2QueueService } from './hotnet2-queue.service';
import { Hotnet2ResultService } from './hotnet2-result.service';
import { OtAssociationsService } from './ot-associations.service';
import { OtEvidenceService } from './ot-evidence.service';
import { ElasticService } from './elastic.service';
import { ResultRecordComponent } from './result-record/result-record.component';
import { ResultRecordMiniComponent } from './result-record-mini/result-record-mini.component';
import { ResultRecordNoneComponent } from './result-record-none/result-record-none.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    DiseaseComponent,
    DiseaseSummaryComponent,
    SubnetworksComponent,
    SubnetworksDefaultComponent,
    SubnetworksQueueComponent,
    SubnetworksSummaryComponent,
    SubnetworksResultComponent,
    SubnetworksVisComponent,
    SubnetworksResultDrugsComponent,
    SubnetworksResultGenesComponent,
    SubnetworksVisDetailsComponent,
    ResultRecordComponent,
    ResultRecordMiniComponent,
    ResultRecordNoneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    EfoService, 
    EfoParentsService, 
    EfoChildrenService, 
    Hotnet2VersionService, 
    Hotnet2QueueService, 
    Hotnet2ResultService, 
    OtEvidenceService,
    OtAssociationsService,
    ElasticService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

