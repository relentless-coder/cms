export const thisPost = 'thisPost'

export const thisPostFunc = function($http){
  return {
    createPost: function(value, query){
      return $http.post(`/post?draft=${query}`, value)
    }
  }
}
