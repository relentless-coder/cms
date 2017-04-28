import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import 'ngstorage';
import {userFactory, userFactoryFunc} from './user.factory';
import {headerComponentName, headerComponentOptions} from './header.component.js';
import './header.scss';

export const header = angular.module('header', [ngSanitize, 'ngStorage'])
.component(headerComponentName, headerComponentOptions)
.factory(userFactory, ['$http', userFactoryFunc])
.name
