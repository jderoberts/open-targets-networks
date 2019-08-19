import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subnetworks-result-genes',
  templateUrl: './subnetworks-result-genes.component.html',
  styleUrls: ['./subnetworks-result-genes.component.scss']
})
export class SubnetworksResultGenesComponent implements OnInit {

  @Input() data;
  @Input() nodeList;

  constructor() { }

  ngOnInit() {
  }

}
