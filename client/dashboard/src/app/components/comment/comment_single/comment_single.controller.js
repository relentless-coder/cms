function singleCommentController(singleCommentFactory, $stateParams){
    const ctrl = this;
    ctrl.reply = {};
    ctrl.$onInit = function () {
        singleCommentFactory.getComment($stateParams.id).then((data)=>{
            ctrl.comment = data.data.data;
            console.log(data);
            $('.comments').addClass('hide');
        })
    }

    ctrl.replyComment = (id)=>{
        singleCommentFactory.replyComment(ctrl.reply, id).then((data)=>{
            ctrl.reply = {};
        })
    }
}

export {singleCommentController}