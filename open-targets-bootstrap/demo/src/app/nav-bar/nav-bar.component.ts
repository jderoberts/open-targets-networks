import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  search_parameter = "";
  valid_efo = true;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmit(event) {
    if (/^EFO_[0-9]{7}$/.test(this.search_parameter)||/^Orphanet_[0-9]{6}$/.test(this.search_parameter)) {
      this.valid_efo = true;
      this.router.navigate(['/disease/',this.search_parameter]);
      //this.search_parameter = "";
    }
    else {
      this.valid_efo = false;
      event.preventDefault();
    }
  }

}
