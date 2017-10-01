import {loginFactory, loginFactoryFunc} from './login.factory';
import {tokenFactory, tokenFactoryFunc} from './token.factory';
import {loginComponent, loginOptions} from './login.component';
import './login.scss';

export const login = angular.module('login', [])
.component(loginComponent, loginOptions)
.factory(loginFactory, ['$http', loginFactoryFunc])
.factory(tokenFactory, ['$localStorage', tokenFactoryFunc])
.name
