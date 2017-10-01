import { newsFactory, newsFactoryFunc } from './newsletter.factory';
import { newsletterComponent, newsletterOptions } from './newsletter.component';
import './newsletter.scss';

export const news = angular.module('news', [])
  .component(newsletterComponent, newsletterOptions)
  .factory(newsFactory, ['$http', newsFactoryFunc])
  .name