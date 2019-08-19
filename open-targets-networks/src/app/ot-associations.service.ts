import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class OtAssociationsService {

private url = "http://api.opentargets.io/v3/platform/public/association/filter?size=10000&fields=none&disease="

  constructor(private http: HttpClient) { }

  getPost(code: string) : Observable<number> {
    return this.http
        .get(this.url+code)
        .map(response => response['size'])
        .catch(this.handleError);
  }

  private handleError(error : any) {
        return Observable.throw(error.statusText);
  }


}
