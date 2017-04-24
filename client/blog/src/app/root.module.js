import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {rootComponentName, rootComponent} from './root.component';

angular.module('blog', [uiRouter])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider)=>{
  $locationProvider.html5Mode(true);
}])
.name;
