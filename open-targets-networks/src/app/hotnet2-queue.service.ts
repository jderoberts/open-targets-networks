import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class Hotnet2QueueService {

  private url = "http://localhost:5000/queue/";
  //private url = "/api/queue/";

  constructor(private http: HttpClient) { }

  getPost(efo: string, network: string) : Observable<string> {
    return this.http
        .get(this.url+efo+"/"+network+"/hotnet2")
        .map(response => response['message'])
        .catch(this.handleError);
  }

  private handleError(error : any) {
        return Observable.throw(error.statusText);
  }
}
