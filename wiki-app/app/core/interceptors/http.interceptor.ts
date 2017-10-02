import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  Headers,
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from '../services/app-constants';

@Injectable()
export class InterceptedHttp extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private route: ActivatedRoute
  ) {
    super(backend, defaultOptions);
  }

  request(
    url: string | Request,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(
    url: string,
    body: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(
    url: string,
    body: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private getRequestOptionArgs(
    options?: RequestOptionsArgs
  ): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    this.getParamsSign(options.headers);

    return options;
  }

  private getParamsSign(headers: Headers): Headers {
    let queryParams = this.route.snapshot.queryParamMap;
    let sign = '';
    for (let key of queryParams.keys) {
      if (key === 'sign' || key === 'hash' || key === 'api_result') {
        continue;
      }
      sign += queryParams.get(key);
    }
    headers.append(AppConstants.SIGN_REQUEST, sign);
    headers.append(AppConstants.SIGN, queryParams.get(AppConstants.SIGN));
    return headers;
  }
}
