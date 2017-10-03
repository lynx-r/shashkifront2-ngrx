import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ApiBase } from './api-base';
import { Utils } from './utils.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ApiBoardBoxService extends ApiBase {
  constructor(private http: Http, private router: ActivatedRoute) {
    super();
  }

  get(resource: string) {
    return this.http.get(this.apiBoardUrl() + resource).map(resp => {
      return Utils.processRequest(resp);
    });
  }

  post(resource: string, param: any) {
    return this.http.post(this.apiBoardUrl() + resource, param).map(resp => {
      return Utils.processRequest(resp);
    });
  }

  put(resource: string, param: any) {
    return this.http.put(this.apiBoardUrl() + resource, param).map(resp => {
      return Utils.processRequest(resp);
    });
  }
}
