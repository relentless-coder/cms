import angular from 'angular'
import {home} from './home/home.module'
import {contact} from './contact/contact.module'

export const components = angular.module('components', [home, contact])
.name
