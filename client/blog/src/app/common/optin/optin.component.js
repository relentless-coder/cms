import optinFunction from './optin.controller'

export const optinComponent = 'optin';
export const optinComponentOptions = {
	templateUrl: 'blog/src/app/common/optin/optin.html',
	controller: ['optinFactory', optinFunction],
	controllerAs: 'ctrl'
}