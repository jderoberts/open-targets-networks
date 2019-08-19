import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ElasticService } from '../elastic.service';
import { RecordResult } from "../record-result.model";
import { Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField: FormControl;
  jsonResponse : RecordResult[] = [];
  responseLength = [];
  pageStart = 0;
  pageEnd = 10;
  currentPage=0;

  constructor(private es:ElasticService, private router:Router, private route:ActivatedRoute) {
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
        //console.log(this.jsonResponse);
        this.responseLength = new Array(Math.ceil(this.jsonResponse.length/10));
      });

      this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
  }

  ngOnInit() {
    let searchParam = this.route.snapshot.paramMap.get('param');
    if(searchParam) {
      this.searchField.setValue(searchParam);
    }
  }

  nextPage() {
    this.goToPage(this.currentPage+1);
  }
  prevPage() {
    this.goToPage(this.currentPage-1);
  }
  goToPage(page) {
    this.pageStart = page*10;
    this.pageEnd = page*10 + 10;
    this.currentPage = page;
    console.log(this.pageStart,",",this.pageEnd);
    window.scrollTo(0,300);
  }

}
