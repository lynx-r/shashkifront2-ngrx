import { IAlbum } from 'angular2-lightbox';

export class Changelog {
  version: string;
  date: string;
  description: string;
  features: { video?: IAlbum; feature: string }[];
}
