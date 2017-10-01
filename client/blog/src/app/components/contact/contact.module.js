import {contactFactory, contactFactoryFunc} from './contact.factory'
import {contactComponent, contactComponentOptions} from './contact.component'
import './contact.scss'

export const contact = angular.module('contact', [])
.component(contactComponent, contactComponentOptions)
.factory(contactFactory, ['$http', contactFactoryFunc])
.name
