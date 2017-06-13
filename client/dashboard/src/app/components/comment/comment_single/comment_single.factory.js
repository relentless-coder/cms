export const singleCommentFactory = 'singleCommentFactory';

export const singleCommentFactoryFunction = function($http){
    return {
        getComment: (value)=>{
            return $http.get(`/admin/comment/${value}`)
        },
        replyComment: (value, id)=>{
            return $http.post(`/comment/${id}`)
        }
    }
}
