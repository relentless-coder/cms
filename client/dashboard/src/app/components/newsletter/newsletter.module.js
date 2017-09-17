import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { newsFactory, newsFactoryFunc } from './newsletter.factory';
import { newsletterComponent, newsletterOptions } from './newsletter.component';
import './newsletter.scss';

export const news = angular.module('news', [uiRouter, 'ui.tinymce'])
  .component(newsletterComponent, newsletterOptions)
  .config(['$stateProvider', function ($stateProvider) {
    let newState = {
      name: 'newsletter',
      url: '/admin/newsletter',
      component: newsletterComponent
    }

    $stateProvider.state(newState);
  }])
  .factory(newsFactory, ['$http', newsFactoryFunc])
  .name