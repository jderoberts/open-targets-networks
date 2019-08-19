import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  efo: string;
  network: string;
  selectedNetwork : string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.efo = params['disease'];
        this.network = params['network'];
    });
  }

  onClick(nw: string) {
    this.selectedNetwork = nw;
  }
}
