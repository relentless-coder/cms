import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {sidebar} from './common/sidebar.module';
import {components} from './components/component.module';
import {rootComponentName, rootComponent} from './root.component';
import {tokenFactory, tokenFactoryFunc} from './components/login/token.factory.js'

angular.module('cms', [sidebar, components, uiRouter, 'ngStorage'])
.component(rootComponentName, rootComponent)
.config(($locationProvider, $stateProvider)=>{
  $locationProvider.html5Mode(true);
})
.run([tokenFactory, '$http', function(tokenFactory, $http){
  if(tokenFactory.findToken()){
    const token = tokenFactory.getToken();
    $http.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}])
.name;
