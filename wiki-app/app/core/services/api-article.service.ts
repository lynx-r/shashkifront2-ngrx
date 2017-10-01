import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';
import { Http, Headers } from '@angular/http';
import { Utils } from './utils.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ApiArticleService extends ApiBase {
  constructor(private http: Http, private router: ActivatedRoute) {
    super();
  }

  get(resource: string) {
    let signHeaders = this.getParamsSign(this.router.snapshot.queryParamMap);
    return this.http
      .get(this.apiArticleUrl() + resource, {
        headers: signHeaders,
      })
      .map(resp => {
        return Utils.processRequest(resp);
      });
  }

  post(resource: string, config: any) {
    let signHeaders = this.getParamsSign(this.router.snapshot.queryParamMap);
    return this.http
      .post(this.apiArticleUrl() + resource, config, {
        headers: signHeaders,
      })
      .map(resp => {
        return Utils.processRequest(resp);
      });
  }

  put(resource: string, param: any) {
    let signHeaders = this.getParamsSign(this.router.snapshot.queryParamMap);
    return this.http
      .put(this.apiArticleUrl() + resource, param, {
        headers: signHeaders,
      })
      .map(resp => {
        return Utils.processRequest(resp);
      });
  }
}
