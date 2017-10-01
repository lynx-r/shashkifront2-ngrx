import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ApiBase } from './api-base';
import { Utils } from './utils.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ApiBoardService extends ApiBase {
  constructor(private http: Http, private router: ActivatedRoute) {
    super();
  }

  get(resource: string) {
    let signHeaders = this.getParamsSign(this.router.snapshot.queryParamMap);
    return this.http
      .get(this.apiBoardUrl() + resource, {
        headers: signHeaders,
      })
      .map(resp => {
        return Utils.processRequest(resp);
      });
  }

  post(resource: string, param: any) {
    let signHeaders = this.getParamsSign(this.router.snapshot.queryParamMap);
    return this.http
      .post(this.apiBoardUrl() + resource, param, {
        headers: signHeaders,
      })
      .map(resp => {
        return Utils.processRequest(resp);
      });
  }
}
