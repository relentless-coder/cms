import {sidebar} from './common/sidebar.module';
import {components} from './components/component.module';
import {rootComponentName, rootComponent} from './root.component';
import {tokenFactory, tokenFactoryFunc} from './components/login/token.factory.js';
import {appConfig} from './root.config';
import './root.scss'

angular.module('cms', [sidebar, components, 'ui.router', 'ngFileUpload', 'ngSanitize', 'ngStorage', 'ui.tinymce'])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', appConfig])
.run([tokenFactory, '$http', function(tokenFactory, $http){
  if(tokenFactory.findToken()){
    const token = tokenFactory.getToken();
    $http.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}])
.name;
