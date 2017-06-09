import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {singleCommentComponent, singleCommentComponentOptions} from './comment_single.component';
import {singleCommentFactory, singleCommentFactoryFunction} from './comment_single.factory';

export const comment_single = angular.module('comment_single', [uiRouter])
.component(singleCommentComponent, singleCommentComponentOptions)
.factory(singleCommentFactory, ['$http', singleCommentFactoryFunction])
.config(['$stateProvider', ($stateProvider)=>{
	const singleState = {
		name: 'comments.comment',
		url: '/:id',
		component: singleCommentComponent
	}
	$stateProvider.state(singleState);
}])
.name;