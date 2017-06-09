import {singleCommentController} from './comment_single.controller';

export const singleCommentComponent = 'singleCommentComponent';
export const singleCommentComponentOptions = {
    templateUrl: '/dashboard/src/app/components/comment/comment_single/comment_single.html',
    controller: ['singleCommentFactory', '$stateParams', singleCommentController]
}