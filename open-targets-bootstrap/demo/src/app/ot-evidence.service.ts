import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class OtEvidenceService {

  private url = "http://api.opentargets.io/v3/platform/public/association/filter?fields=association_score&disease="

  constructor(private http: Http) { }

  getPost(code: string, targets: string[]) {
    return Observable.forkJoin(
      targets.map(
        i => this.http.get(this.url+code+"&target="+i)
          .map((response: Response) => response.json()['data'][0]['association_score']['datatypes'])
      )
    );
  }

  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }

}
