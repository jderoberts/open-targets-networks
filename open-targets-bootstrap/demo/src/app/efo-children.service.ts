import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { EFOParent } from "./efo-parent";

@Injectable()
export class EfoChildrenService {

  private url = "https://www.ebi.ac.uk/ols/api/ontologies/efo/terms/http%253A%252F%252Fwww.ebi.ac.uk%252Fefo%252F";
  
  constructor(private http: Http) { }
  getPost(code: string) : Observable<EFOParent[]> {
    return this.http
        .get(this.url+code+"/hierarchicalChildren")
        .map((response: Response) => {
                return <EFOParent[]>response.json()['_embedded']['terms'];
        }).catch(this.handleError);
  }
  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }
}
