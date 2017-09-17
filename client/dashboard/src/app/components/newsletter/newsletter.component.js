import angular from 'angular';
import {newsletterController} from './newsletter.controller'

export const newsletterOptions = {
  templateUrl: 'dashboard/src/app/components/newsletter/newsletter.html',
  controller: ['newsFactory', '$http', '$state', newsletterController],
  controllerAs: 'ctrl'
}

export const newsletterComponent = 'newsLeterComponent';