import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subnetworks-result-drugs',
  templateUrl: './subnetworks-result-drugs.component.html',
  styleUrls: ['./subnetworks-result-drugs.component.scss']
})
export class SubnetworksResultDrugsComponent implements OnInit {

  @Input() data;
  @Input() diseaseList;

  roman = {"4" : "IV", "3":"III", "2":"II", "1":"I", "0":"0"};
  trial_colour = {"4":"success", "3":"info", "2":"warning", "1":"danger", "0":"danger"};
  min_trial_stage = 1;
  min_indications = 1;
  indications_filter = "";

  constructor() { }

  ngOnInit() {
  }

  trialCheck(stage) {
    return (stage >= this.min_trial_stage);
  }

  indFiltered(diseases) {
    if (this.indications_filter == "") {
      return true;
    }
    if (diseases.indexOf(this.indications_filter) == -1) {
      return false;
    }
    return true;
  }

}
