import {navComponent, navComponentOptions} from './navbar.component';
import {showHeader} from './showheader.directive'
import './navbar.scss';

export const navbar = angular.module('navbar', [])
.component(navComponent, navComponentOptions)
.directive('showHeader', showHeader)
.name;
