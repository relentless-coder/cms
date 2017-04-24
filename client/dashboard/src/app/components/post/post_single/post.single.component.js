import angular from 'angular';
import {postSingleController} from './post.single.controller';

export const postSingleComponent = 'postSingleComponent';
export const postSingleOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_single/post.single.html',
  controller: ['postSingleFactory', 'postUpdateFactory', '$stateParams', postSingleController],
  controllerAs: 'ctrl'
}
