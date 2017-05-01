import {commentController} from './comment.controller'

export const commentComponent = 'commentComponent'
export const commentComponentOptions = {
  bindings: {
    post: '<'
  },
  templateUrl: 'blog/src/app/components/post/comment/comment.html',
  controller: ['$stateParams', 'commentFactory', '$rootScope', commentController],
  controllerAs: 'cm'
}
