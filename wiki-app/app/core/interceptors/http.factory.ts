import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { InterceptedHttp } from './http.interceptor';
import { ActivatedRoute } from '@angular/router';

export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  route: ActivatedRoute
): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, route);
}
