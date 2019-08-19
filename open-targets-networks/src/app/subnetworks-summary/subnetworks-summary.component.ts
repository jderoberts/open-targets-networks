import { Component, OnInit, Input } from '@angular/core';
import { Hotnet2Response } from '../hotnet2-response.model';
import { Hotnet2QueueService } from '../hotnet2-queue.service';

@Component({
  selector: 'app-subnetworks-summary',
  templateUrl: './subnetworks-summary.component.html',
  styleUrls: ['./subnetworks-summary.component.scss']
})
export class SubnetworksSummaryComponent implements OnInit {
  
  @Input() response : Hotnet2Response;
  @Input() efo : string;
  @Input() network : string;
  queued : string;

  constructor(public queueService : Hotnet2QueueService) { }

  ngOnInit() {
  }

  onClick() {
    this.queueService.getPost(this.efo, this.network)
        .subscribe(result => this.queued = result,
                error => console.log("Error :: " + error)
        )
  }

}
