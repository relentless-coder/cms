import {about} from './about/about.module'
import {contact} from './contact/contact.module'
import {post} from './post/post.module'

export const components = angular.module('components', [about, contact, post])
.name
