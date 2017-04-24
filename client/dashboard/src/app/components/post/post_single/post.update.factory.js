export const postUpdateFactory = 'postUpdateFactory';
export const postUpdateFactoryFunc = function($http){
  return {
    updatePost: function(url, value){
      return $http.put('/post/'+ url, value);
    }
  }
}
