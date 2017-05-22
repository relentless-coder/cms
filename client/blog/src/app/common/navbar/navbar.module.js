import angular from 'angular';
import 'ngstorage';
import {navComponent, navComponentOptions} from './navbar.component';
import {showHeader} from './showheader.directive'
import './navbar.scss';

export const navbar = angular.module('navbar', ['ngStorage'])
.component(navComponent, navComponentOptions)
.directive('showHeader', showHeader)
.name;
