import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {header} from './common/header/header.module';
import {navbar} from './common/navbar/navbar.module';
import {optin} from './common/optin/optin.module'
import {components} from './components/components.module'
import {rootComponentName, rootComponent} from './root.component';
import './root.scss';

angular.module('blog', [uiRouter, header, navbar, optin, components])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider)=>{
  $locationProvider.html5Mode(true);
}])
.name;
