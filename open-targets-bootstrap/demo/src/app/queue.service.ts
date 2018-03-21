import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class QueueService {

private url = "http://localhost:5000/queue/";

  constructor(private http: Http) { }

  getPost(efo: string, network: string) : Observable<string> {
    return this.http
        .get(this.url+efo+"/"+network+"/hotnet2")
        .map((response: Response) => {
                return response.json()['message'];
        }).catch(this.handleError);
  }

  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }
}
