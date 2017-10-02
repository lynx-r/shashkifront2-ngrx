import { Headers } from '@angular/http';
import config from '../../config/config.json';
import { profile } from '../../config/profile';
import { ParamMap, Params } from '@angular/router';
import { Dictionary } from '../../../../modules/entity/src/models';
import { AppConstants } from './app-constants';

export class ApiBase {
  protected apiBoardUrl() {
    return this.getConfig().api_board_url;
  }

  protected apiArticleUrl() {
    return this.getConfig().api_article_url;
  }

  protected apiArticleApiKey() {
    return this.getConfig().api_key_article;
  }

  protected apiBoardApiKey() {
    return this.getConfig().api_key_board;
  }

  protected getParamsSign(queryParams: ParamMap): Headers {
    let headers = new Headers();
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

  private getConfig() {
    return (<any>config)[profile];
  }
}
