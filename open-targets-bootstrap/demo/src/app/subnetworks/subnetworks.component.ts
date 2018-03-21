import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotnet2VersionService } from '../hotnet2-version.service';
import { Hotnet2Response } from '../hotnet2-response';

@Component({
  selector: 'app-subnetworks',
  templateUrl: './subnetworks.component.html',
  styleUrls: ['./subnetworks.component.scss']
})
export class SubnetworksComponent implements OnInit {

  efo : string;
  network : string;
  response : Hotnet2Response;

  constructor(public route: ActivatedRoute, public hotnet2VersionService : Hotnet2VersionService) { }

  ngOnInit() { 
    this.route.parent.params.subscribe(params => {
        this.efo = params['disease'];
    });
    this.route.params.subscribe(params => {
        this.network = params['network'];
	this.response = undefined; //clear previous response object
        this.getPost();
    });
  }

  getPost(): void {
        this.hotnet2VersionService.getPost(this.efo, this.network)
        .subscribe(result => this.response = result,
                error => console.log("Error :: " + error)
        )
  }
}
