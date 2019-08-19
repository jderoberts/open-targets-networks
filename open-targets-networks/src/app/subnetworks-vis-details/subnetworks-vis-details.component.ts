import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subnetworks-vis-details',
  templateUrl: './subnetworks-vis-details.component.html',
  styleUrls: ['./subnetworks-vis-details.component.scss']
})
export class SubnetworksVisDetailsComponent implements OnInit {

  @Input() selectedNode;
  @Input() efo;

  constructor() { }

  ngOnInit() {
  }

}
