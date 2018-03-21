import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { Hotnet2Response } from "./hotnet2-response";

@Injectable()
export class Hotnet2VersionService {

  private url = "http://localhost:5000/version/";

  constructor(private http: Http) { }

  getPost(efo: string, network: string) : Observable<Hotnet2Response> {
    return this.http
        .get(this.url+efo+"/"+network+"/hotnet2")
        .map((response: Response) => {
                return <Hotnet2Response>response.json();
        }).catch(this.handleError);
  }

  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }

}
