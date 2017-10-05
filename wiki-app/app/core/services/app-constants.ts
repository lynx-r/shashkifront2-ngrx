export class AppConstants {
  static ALPH: { [key: number]: string } = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
    9: 'i',
    10: 'j',
  };

  static MY_DATE_FORMATS = {
    parse: {
      dateInput: 'yyyy.MM.dd',
    },
    display: {
      dateInput: 'input',
      monthYearLabel: { year: 'numeric', month: 'short' },
      dateA11yLabel: { year: 'numeric', month: 'short', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'short' },
    },
  };

  static ARTICLES_RESOURCE: string = '/articles';
  static ARTICLE_RESOURCE: string = '/article';
  static BOARDS_RESOURCE: string = '/boards';
  static BOARD_RESOURCE: string = '/board';
  static UNDO: string = '/undo';
  static REDO: string = '/redo';

  static HOST: string = 'http://localhost:4200';
  static ARTICLE_PAGE_SIZE: number = 50;
  static PLACE_MODE: string = 'place';
  static WRITE_MODE: string = 'write';
  static ARTICLE_CREATE_COOKIE: string = 'article-create-cookie';
  static DRAUGHT_PLACE_COOKIE: string = 'draught-place-cookie';
  static DELETE_DRAUGHT_CHECKED_COOKIE: string = 'delete-draught-checked-cookie';
  static EDIT_MODE_COOKIE: string = 'edit-mode-cookie';
  static SIGN_REQUEST: string = 'sign-request';
  static SIGN: string = 'sign';
  static DEBOUNCE_SAVE = 500;
  static SIMPLE_STROKE: string = 'SIMPLE';
  static ARTICLE_INFO_TAB_COOKIE: string = 'article-info-tab';
  static SIMPLE_STROKE_NOTATION: string = '-';
  static CAPTURE_STROKE_NOTATION: string = ':';
  static PAGE_LOADING_MESSAGE: string = 'Загрузка страницы...';
}
