import {home} from './home/home.module'
import {contact} from './contact/contact.module'
import {post} from './post/post.module'

export const components = angular.module('components', [home, contact, post])
.name
