export const thisPost = 'thisPost'

export const thisPostFunc = function($http){
  return {
    createPost: function(value){
      console.log(value);
      return $http.post('/post', value)
    }
  }
}
