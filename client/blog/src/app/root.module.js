import {header} from './common/header/header.module';
import {navbar} from './common/navbar/navbar.module';
import {optin} from './common/optin/optin.module'
import {components} from './components/components.module'
import {rootComponentName, rootComponent} from './root.component';
import {appConfig} from './root.config';
import './root.scss';

angular.module('blog', [header, navbar, optin, components, 'ui.router', 'ngFileUpload','ngSanitize', 'ngStorage', 'hljs'])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider', appConfig])
.name;
