export const postSingleFactory = 'postSingleFactory';
export const postSingleFactoryFunc = function($http){
  return {
    getSinglePost: function(value){
      return $http.get('/post/' + value);
    }
  }
}
