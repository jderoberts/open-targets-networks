import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ElasticService } from '../elastic.service';
import { RecordResult } from "../record-result.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  serviceRunning = false;
  serviceWarning = "<span>Elasticsearch instance</br>is not running</span>";
  searchField: FormControl;
  jsonResponse : RecordResult[] = [];
  searchSelected = false;
  currentPage = 'home';

  constructor(private es:ElasticService, private router:Router) {
      this.es.testConnection()
      .subscribe(
        result => { this.serviceRunning = true }, 
        error => { this.serviceRunning = false }
      );

      this.searchField = new FormControl();
      let input$ = this.searchField.valueChanges.pipe(
        debounceTime(200),
        filter(query => query.length >= 2 || query.length === 0),
        distinctUntilChanged(),
        switchMap(value => this.es.getResults(value))
      );

      input$.subscribe((resp) => {
        let result = resp as any;
        let hits = result.hits.hits;
        this.jsonResponse = hits.map(hit => new RecordResult(hit));
        console.log(this.jsonResponse);
      });
      console.log(this.es)
  }

  ngOnInit() {
  }

  setPage(page) {
    this.currentPage = page;
  }

  checkPage(page) {
    return page == this.currentPage ? 'active' : ''
  }

  navigate(param) {
    //If Elasticsearch is down, accept valid EFO and navigate directly
    if (!this.serviceRunning&&this.isValid(param)) {
      this.currentPage = '';
      this.router.navigate(['/disease/',param]);
    } else {
      this.currentPage = 'search';
      this.router.navigate(['/search',param]);
    }
  }

  isValid(param) {
    if (/^EFO_[0-9]{7}$/.test(param)||/^Orphanet_[0-9]{6}$/.test(param)) {
      return true;
    }
  }
}
