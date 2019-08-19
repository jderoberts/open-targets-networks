import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Hotnet2QueueService } from '../hotnet2-queue.service';

@Component({
  selector: 'app-subnetworks-queue',
  templateUrl: './subnetworks-queue.component.html',
  styleUrls: ['./subnetworks-queue.component.scss']
})
export class SubnetworksQueueComponent implements OnInit {
  @Input() efo: string;
  @Input() network: string;
  queued : string;


  constructor(public queueService : Hotnet2QueueService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.queued = "";
  }

  onClick() {
    this.queueService.getPost(this.efo, this.network)
        .subscribe(result => this.queued = result,
                error => console.log("Error :: " + error)
        )
  }

}
