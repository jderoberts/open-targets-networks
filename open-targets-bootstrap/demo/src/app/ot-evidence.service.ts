import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class OtEvidenceService {

  private url = "http://api.opentargets.io/v3/platform/public/association/filter?fields=association_score&disease="
  no_result = JSON.parse('{"literature": 0, "rna_expression": 0, "genetic_association": 0, "somatic_mutation": 0, "known_drug": 0, "animal_model": 0, "affected_pathway": 0}');
  //counter = 1;

  constructor(private http: Http) { }

  getPost(code: string, targets: string[]) {
    return Observable.forkJoin(
      targets.map(
        i => this.http.get(this.url+code+"&target="+i)
          .map((response: Response) => {
                //console.log(this.counter+": "+i);
                //this.counter++;
                if (!response.json()['data'][0]) {
                    console.log("No data found for "+i);
                    return this.no_result;
                };
                return response.json()['data'][0]['association_score']['datatypes']
          })
      )
    );
  }

  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }

}
