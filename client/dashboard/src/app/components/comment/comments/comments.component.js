import {commentsController} from './comments.controller';

export const commentComponent = 'commentComponent';
export const commentComponentOptions = {
    templateUrl: '/dashboard/src/app/components/comment/comments/comments.html',
    controller: ['commentsFactory', commentsController],
    controllerAs: 'ctrl'
}