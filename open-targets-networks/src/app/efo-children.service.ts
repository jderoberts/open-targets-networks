import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { EFOEntity } from "./efo-entity.model";

@Injectable()
export class EfoChildrenService {

  private url = "https://www.ebi.ac.uk/ols/api/ontologies/efo/terms/http%253A%252F%252Fwww.ebi.ac.uk%252Fefo%252F";
  
  constructor(private http: HttpClient) { }
  getPost(code: string) : Observable<EFOEntity[]> {
    return this.http
        .get(this.url+code+"/hierarchicalChildren")
        .map(response => <EFOEntity[]>response['_embedded']['terms'])
        .catch(this.handleError);
  }
  private handleError(error : any) {
        return Observable.throw(error.statusText);
  }
}
