import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import {userFactory, userFactoryFunc} from './user.factory';
import {headerComponentName, headerComponentOptions} from './header.component.js';

export const header = angular.module('header', [ngSanitize])
.component(headerComponentName, headerComponentOptions)
.factory(userFactory, ['$http', userFactoryFunc])
.name
