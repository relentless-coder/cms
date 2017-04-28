import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {header} from './common/header/header.module.js';
import {navbar} from './common/navbar/navbar.module.js';
import {components} from './components/components.module.js'
import {rootComponentName, rootComponent} from './root.component';
import './root.scss';

angular.module('blog', [uiRouter, header, navbar, components])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider)=>{
  $locationProvider.html5Mode(true);
}])
.name;
