import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './api-base';
import { Utils } from './utils.service';

@Injectable()
export class ApiBoardService extends ApiBase {
  constructor(private http: Http) {
    super();
  }

  get(resource: string) {
    return this.http.get(this.apiBoardUrl() + resource).map(resp => {
      return Utils.processRequest(resp);
    });
  }

  post(resource: string, config) {
    return this.http.post(this.apiBoardUrl() + resource, config).map(resp => {
      return Utils.processRequest(resp);
    });
  }
}
