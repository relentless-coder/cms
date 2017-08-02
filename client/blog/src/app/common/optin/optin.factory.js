export const optinFactory = 'optinFactory';
export const optinFactoryFunction = function optinFactoryFunction($http) {
	return {
		submitOptin: function submitOptin(user) {
			return $http.post('/subscribe')
		}
	}
}