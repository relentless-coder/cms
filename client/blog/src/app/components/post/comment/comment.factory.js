export const commentFactory = 'commentFactory'
export const commentFactoryFunc = function($http){
  return {
    postComment: function(url, value){
      return $http.post(`/${url}/comment`, value)
    },
    reply: function(id, value){
      return $http.post(`/comment/${id}`, value)
    }
  }
}
