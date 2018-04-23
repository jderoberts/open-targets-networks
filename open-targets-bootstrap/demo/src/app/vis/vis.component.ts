import { Component, OnInit, AfterViewInit, Input } from '@angular/core'; import { Hotnet2ResultService } 
from '../hotnet2-result.service'; import { OtEvidenceService } from '../ot-evidence.service';

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.scss']
})
export class VisComponent implements OnInit {
  
  @Input() efo;
  @Input() network;
  data;
  current = 0;
  nodeList;  
  diseaseList;
  summaryDiv = "genes";
  roman = {"4" : "IV", "3":"III", "2":"II", "1":"I", "0":"0"};
  trial_colour = {"4":"success", "3":"info", "2":"warning", "1":"danger", "0":"danger"};
  min_trial_stage = 1;
  min_indications = 1;
  indications_filter = "";

  constructor(private hotnet2ResultService : Hotnet2ResultService, private otEvidenceService: OtEvidenceService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getResults();
  }

  getResults() {
    this.hotnet2ResultService.getPost(this.efo, this.network)
      .subscribe(resultArray => this.data = resultArray,
                error => console.log("Error :: " + error),
                () => {this.fetchApi();this.getNodes();this.getDiseases();}
      );
  }

  update(subn: number) : void {
    this.current = subn;
    this.fetchApi();
    this.getNodes();
    this.getDiseases();
  }

  getNodes() {
    this.nodeList = [];
    for (var i = 0; i < this.data[this.current].nodes.length; i++) {
      this.nodeList.push(this.data[this.current].nodes[i].label);
    }
    this.nodeList.sort();
  }

  getDiseases() {
    this.diseaseList = [""];
    for (var i = 0; i < this.data[this.current].drugs.length; i++) {
        for (var j = 0; j < this.data[this.current].drugs[i].indications.length; j++) {
            if (this.diseaseList.indexOf(this.data[this.current].drugs[i].indications[j].efo_term) == -1) {
                this.diseaseList.push(this.data[this.current].drugs[i].indications[j].efo_term);
            }
        }
    }
    this.diseaseList.sort();
  }

  fetchApi(): void {
    var nodes = this.data[this.current].nodes;
    var ids = [];
    for (var i = 0; i < nodes.length ; i++) {
      ids.push(nodes[i].id);
    }
    this.otEvidenceService.getPost(this.efo, ids)
        //.finally(()  => console.log('All done!'))
        .subscribe(resultArray => {
                     for (var i = 0; i < nodes.length ; i++) {
                       nodes[i].affected_pathway = resultArray[i].affected_pathway;
                       nodes[i].animal_model = resultArray[i].animal_model;
                       nodes[i].genetic_association = resultArray[i].genetic_association;
                       nodes[i].known_drug = resultArray[i].known_drug;
                       nodes[i].literature = resultArray[i].literature;
                       nodes[i].rna_expression = resultArray[i].rna_expression;
                       nodes[i].somatic_mutation = resultArray[i].somatic_mutation;
                     }
                   },
                error => console.log("Error :: " + error)
        );
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
