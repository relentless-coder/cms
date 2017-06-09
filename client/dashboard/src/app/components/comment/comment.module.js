import angular from 'angular';

import {comments} from './comments/comments.module';
import {comment_single} from './comment_single/comment_single.module';

export const comment = angular.module('comment', [comments, comment_single])
.name;