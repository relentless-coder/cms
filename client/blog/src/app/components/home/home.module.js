import angular from 'angular'
import uiRouter from 'angular-ui-router'
import 'ngstorage'
import ngSanitize from 'angular-sanitize';
import {homeComponent, homeComponentOptions} from './home.component'
import './home.scss'

export const home = angular.module('home', ['ngStorage', ngSanitize, uiRouter])
.config(['$stateProvider', ($stateProvider)=>{
  const homeState = {
    name: 'home',
    url: '/',
    component: homeComponent
  }

  $stateProvider.state(homeState);
}])
.component(homeComponent, homeComponentOptions)
.name
