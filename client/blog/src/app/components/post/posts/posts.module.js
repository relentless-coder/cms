import {postsComponent, postsComponentOptions} from './posts.component';
import {postsFactory, postsFactoryFunction} from './posts.factory';
import './posts.scss'

export const posts = angular.module('posts', [])
.factory(postsFactory, ['$http', postsFactoryFunction])
.component(postsComponent, postsComponentOptions)
.name;
