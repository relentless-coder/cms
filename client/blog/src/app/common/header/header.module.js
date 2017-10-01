import {userFactory, userFactoryFunc} from './user.factory';
import {headerComponentName, headerComponentOptions} from './header.component.js';
import './header.scss';

export const header = angular.module('header', [])
.component(headerComponentName, headerComponentOptions)
.factory(userFactory, ['$http', userFactoryFunc])
.name
