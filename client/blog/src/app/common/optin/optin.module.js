import angular from 'angular';
import {optinComponent, optinComponentOptions} from './optin.component'
import {optinFactory, optinFactoryFunction} from './optin.factory'
import './optin.scss'

export const optin = angular.module('optin', [])
.component(optinComponent, optinComponentOptions)
.factory(optinFactory, ['$http', optinFactoryFunction])
.name