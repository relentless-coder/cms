function commentsController(commentsFactory) {
    const ctrl = this;
    ctrl.$onInit = () => {
        commentsFactory.getComments().then((el) => {
            ctrl.comments = el.data.data;
            $('.comments').removeClass('hide');
            console.log(ctrl.comments);
        })
    }

    ctrl.deleteComment = (value) => {
        commentsFactory.deleteComment(value).then((data) => {
            commentsFactory.getComments().then((el) => {
                ctrl.comments = el.data;
            })
        })
    }
}

export { commentsController }