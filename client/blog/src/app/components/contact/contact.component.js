import {contactController} from './contact.controller'

export const contactComponent = 'contactComponent'
export const contactComponentOptions = {
  templateUrl: 'blog/src/app/components/contact/contact.html',
  controller: ['contactFactory', contactController],
  controllerAs: 'ctrl'
}
