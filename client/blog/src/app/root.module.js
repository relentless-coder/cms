import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {header} from './common/header/header.module.js'
import {rootComponentName, rootComponent} from './root.component';

angular.module('blog', [uiRouter, header])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider)=>{
  $locationProvider.html5Mode(true);
}])
.name;
