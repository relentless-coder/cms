import {signupController} from './signup.controller'

export const signupComponent = 'signupComponent';
export const signupOptions = {
  templateUrl: '/dashboard/src/app/components/signup/signup.html',
  controller: ['signupFactory', 'tokenFactory', '$state', '$rootScope', signupController],
  controllerAs: 'ctrl'
}
