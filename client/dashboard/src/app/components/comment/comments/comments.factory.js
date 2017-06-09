export const commentsFactory = 'commentsFactory';
export const commentsFactoryFunc = function($http){
    return {
        getComments: function(){
            return $http.get('/admin/comment')
        },
        deleteComment: (value)=>{
            return $http.delete(`/admin/comment/${value}`)  
        }
    }
} 