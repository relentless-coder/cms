import angular from 'angular';
import 'ngstorage';
import {navComponent, navComponentOptions} from './navbar.component';
import './navbar.scss';

export const navbar = angular.module('navbar', ['ngStorage'])
.component(navComponent, navComponentOptions)
.name;
