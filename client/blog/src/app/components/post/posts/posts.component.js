import {postsController} from './posts.controller'

export const postsComponent = 'postsComponent'
export const postsComponentOptions = {
  templateUrl: 'blog/src/app/components/post/posts/posts.html',
  controller: ['$localStorage', postsController],
  controllerAs: 'ctrl'
}
