import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { Hotnet2Result } from "./hotnet2-result";

@Injectable()
export class Hotnet2ResultService {

  //private url = "http://localhost:5000/subn/";
  private url = "/api/subn/"; //needed for remote host

  constructor(private http: Http) { }

  getPost(efo: string, network: string) : Observable<string> {
    return this.http
        .get(this.url+efo+"/"+network+"/hotnet2")
        .map((response: Response) => {
                return response.json();
        }).catch(this.handleError);
  }

  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }

}
