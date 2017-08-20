export const signupFactory = 'signupFactory';

export const signupFactoryFunc = function($http){
  return {
    signupUser: function(value){
      return $http.post('/admin/new', value)
    }
  }
}