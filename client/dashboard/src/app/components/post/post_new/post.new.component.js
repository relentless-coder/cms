import angular from 'angular';
import {postNewController} from './post.new.controller'

export const postNewOptions = {
  templateUrl: 'dashboard/src/app/components/post/post_new/post.new.html',
  controller: ['thisPost', '$http', postNewController],
  controllerAs: 'ctrl'
}

export const postNewComponent = 'postNew';
