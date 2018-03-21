import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class OtAssociationsService {

private url = "http://api.opentargets.io/v3/platform/public/association/filter?size=10000&fields=none&disease="

  constructor(private http: Http) { }

  getPost(code: string) : Observable<number> {
    return this.http
        .get(this.url+code)
        .map((response: Response) => {
                return response.json()['size'];
        }).catch(this.handleError);
  }

  private handleError(error : Response) {
        return Observable.throw(error.statusText);
  }


}
