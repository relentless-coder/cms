export const getPosts = 'getPosts';
export const getPostsFunc = function($http){
  return {
    allPosts: function(){
      return $http.get('/post')
    }
  }
}
