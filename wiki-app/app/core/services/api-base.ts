import config from '../../config/config.json';
import { profile } from '../../config/profile';

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

  private getConfig() {
    return (<any>config)[profile];
  }
}
