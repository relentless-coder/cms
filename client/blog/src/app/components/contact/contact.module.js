import angular from 'angular'
import uiRouter from 'angular-ui-router'
import {contactFactory, contactFactoryFunc} from './contact.factory'
import {contactComponent, contactComponentOptions} from './contact.component'
import './contact.scss'

export const contact = angular.module('contact', [uiRouter])
.config(['$stateProvider', ($stateProvider)=>{
  const contactState = {
    name: 'contact',
    url: '/contact',
    component: contactComponent
  }
  $stateProvider.state(contactState)
}])
.component(contactComponent, contactComponentOptions)
.factory(contactFactory, ['$http', contactFactoryFunc])
.name
