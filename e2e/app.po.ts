import { browser, element, by } from 'protractor';

export class ExampleAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppDescription() {
    return element(by.css('md-toolbar.ts-row')).getText();
  }
}
