import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  href = "test";

  constructor(public router: Router) { 
    console.log(this.href);  
  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href.substr(this.href.lastIndexOf('/')+1));
  }

}
