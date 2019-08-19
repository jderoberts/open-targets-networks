import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { EFO } from "./efo-summary.model";


@Injectable()
export class EfoService {

  private url_efo = "https://www.ebi.ac.uk/ols/api/ontologies/efo/terms/http%253A%252F%252Fwww.ebi.ac.uk%252Fefo%252F";
  private url_orphanet = "https://www.ebi.ac.uk/ols/api/ontologies/efo/terms/http%253A%252F%252Fwww.orpha.net%252FORDO%252F";
  constructor(private http: HttpClient) { }
  
  getPost(code: string) : Observable<EFO> {
	let url = this.url_efo;
	if (code.substring(0,5) == "Orpha"){ url = this.url_orphanet};
	return this.http
	.get<EFO>(url+code)
        .catch(this.handleError);
  }

  private handleError(error : any) {
	return Observable.throw(error.statusText);
  }
}
