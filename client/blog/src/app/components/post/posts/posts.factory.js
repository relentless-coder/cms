export const postsFactory = 'postsFactory';

export const postsFactoryFunction = function postsFactoryFunction($http) {
	// body...
	return {
		getPosts: ()=>{
			return $http.get('/post')
		}
	}
}