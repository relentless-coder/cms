import {header} from './common/header/header.module';
import {navbar} from './common/navbar/navbar.module';
import {optin} from './common/optin/optin.module'
import {components} from './components/components.module'
import {rootComponentName, rootComponent} from './root.component';
import {appConfig} from './root.config';
import './root.scss';

angular.module('blog', [header, navbar, optin, components, 'ui.router', 'ngFileUpload','ngSanitize', 'ngStorage', 'hljs'])
.component(rootComponentName, rootComponent)
.config(['$stateProvider', '$locationProvider',  appConfig])
.run(['$rootScope', ($rootScope)=>{
    const meta = {
        keywords: 'Ayush Bahuguna, mean stack developer, javascript tutorials, nodejs tutorials, javascript blog, nodejs blog, backend developer tutorials',
        description: 'I am currently employed as a full stack javscript developer, and I am always looking for freelance work. This blog serves as a platform for me to keep track of my progress in becoming a better developer. The articles posted here are open to discussion.',
        title: 'Ayush Bahuguna | Full Stack Javascript Developer'
      }
    
      $rootScope.meta = meta;
}])
.name;
