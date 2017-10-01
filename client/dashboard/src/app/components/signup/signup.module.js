import {signupFactory, signupFactoryFunc} from './signup.factory';
import {signupComponent, signupOptions} from './signup.component';
import './signup.scss';

export const signup = angular.module('signup', [])
.component(signupComponent, signupOptions)
.factory(signupFactory, ['$http', signupFactoryFunc])
.name