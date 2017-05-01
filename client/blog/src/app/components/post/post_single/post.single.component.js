import {postSingleController} from './post.single.controller'

export const postSingleComponent = 'postSingleComponent'
export const postSingleComponentOptions = {
  templateUrl: 'blog/src/app/components/post/post_single/post.single.html',
  controller: ['postSingleFactory', '$stateParams', '$rootScope', postSingleController],
  controllerAs: 'sm'
}
