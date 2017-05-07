function socketFunction(io, url, event){
    const blog = io.of(`/articles/${url}`)
    const admin = io.of('/admin/home')
    blog.on('connection', (fromBlog)=>{
        console.log("Connection made on blog");
        fromBlog.on('comment', (msg)=>{
            event.emit('comment-posted', msg)
        })
    })
    admin.on('connection', (toAdmin)=>{
        console.log("Connection made on admin");        
        event.on('comment-posted', (msg)=>{
            toAdmin.emit('blog-comment', msg)
        })
    })
}

export {socketFunction}