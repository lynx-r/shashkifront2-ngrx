import config from '../config/config.json';
import { profile } from '../config/profile';

export class ApiBase {
  protected apiBoardUrl() {
    return this.getConfig().api_board_url;
  }

  protected apiArticleUrl() {
    return this.getConfig().api_article_url;
  }

  private getConfig() {
    return (<any>config)[profile];
  }
}
