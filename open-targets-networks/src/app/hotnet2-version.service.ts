import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { Hotnet2Response } from "./hotnet2-response.model";

@Injectable()
export class Hotnet2VersionService {

  private url = "http://localhost:5000/version/";
  //private url = "/api/version/";

  constructor(private http: HttpClient) { }

  getPost(efo: string, network: string) : Observable<Hotnet2Response> {
    return this.http
        .get<Hotnet2Response>(this.url+efo+"/"+network+"/hotnet2")
        .catch(this.handleError);
  }

  private handleError(error : any) {
        return Observable.throw(error.statusText);
  }

}
