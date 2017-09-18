import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';
import { Http } from '@angular/http';
import { Utils } from './utils.service';

@Injectable()
export class ApiArticleService extends ApiBase {
  constructor(private http: Http) {
    super();
  }

  get(resource: string) {
    return this.http.get(this.apiArticleUrl() + resource).map(resp => {
      return Utils.processRequest(resp);
    });
  }

  post(resource: string, config: any) {
    return this.http.post(this.apiArticleUrl() + resource, config).map(resp => {
      return Utils.processRequest(resp);
    });
  }

  put(resource: string, param: any) {
    return this.http.put(this.apiArticleUrl() + resource, param).map(resp => {
      return Utils.processRequest(resp);
    });
  }
}
