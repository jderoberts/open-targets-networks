import { Component, OnInit, Input } from '@angular/core';
import { Hotnet2Response } from '../hotnet2-response';

@Component({
  selector: 'app-subnetworks-summary',
  templateUrl: './subnetworks-summary.component.html',
  styleUrls: ['./subnetworks-summary.component.scss']
})
export class SubnetworksSummaryComponent implements OnInit {
  
  @Input() response : Hotnet2Response;

  constructor() { }

  ngOnInit() {
  }

}
