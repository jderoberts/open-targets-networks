import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QueueService } from '../queue.service';

@Component({
  selector: 'app-subnetworks-queue',
  templateUrl: './subnetworks-queue.component.html',
  styleUrls: ['./subnetworks-queue.component.scss']
})
export class SubnetworksQueueComponent implements OnInit {
  @Input() efo: string;
  @Input() network: string;
  queued : string;


  constructor(public queueService : QueueService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.queued = "";
  }

  onClick() {
    console.log("This happens!");
    this.queueService.getPost(this.efo, this.network)
        .subscribe(result => this.queued = result,
                error => console.log("Error :: " + error)
        )
  }

}
