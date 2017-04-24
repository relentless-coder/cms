import angular from 'angular';
import {userFactory, userFactoryFunc} from './user.factory';
import {headerComponentName, headerComponentOptions} from './header.component.js';

export const header = angular.module('header', [])
.component(headerComponent, headerComponentOptions)
.factory(userFactory, ['$http', userFactoryFunc])
.name
