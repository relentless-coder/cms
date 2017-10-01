import {userFactory, userFactoryFunc} from './user.factory.js'
import {userComponent, userComponentOptions} from './user.component.js'
import './user.scss';

export const user = angular.module('user', [])
.component(userComponent, userComponentOptions)
.factory(userFactory, ['$http', '$localStorage', userFactoryFunc])
.name
