import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EfoService } from '../efo.service';
import { OtAssociationsService } from '../ot-associations.service';
import { EFO } from '../efo-summary';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-disease-summary',
  templateUrl: './disease-summary.component.html',
  styleUrls: ['./disease-summary.component.scss']
})
export class DiseaseSummaryComponent implements OnInit {
  @Input() efo: string;
  response: EFO;  
  associations: number;

  constructor(private efoService : EfoService, private otAssociationsService : OtAssociationsService) { }

  ngOnInit() { }

  //reload summary information every time efo changes  
  ngOnChanges() {
    this.getPost();
    if (!this.response) {
      this.response = {
        label: "Not Found",
        synonyms: [""],
        description: ["The EFO code given was not found in the EFO lookup service."]
      }
    }
  }

  getPost(): void {
	this.efoService.getPost(this.efo)
	.subscribe(result => this.response = result,
		error => console.log("Error :: " + error)
	);
        this.otAssociationsService.getPost(this.efo)
        .subscribe(result => this.associations = result,
                error => console.log("Error :: " + error)
        )
  }
}

