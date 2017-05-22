import {returnNotifs} from '../routes/users.routes.js'

function socketFunction(io, notifs) {
    io.on('connection', (localSocket) => {
        const blogRoom = localSocket.handshake['query']['articles/']
        const adminRoom = localSocket.handshake['query']['admin/']
        localSocket.join(blogRoom);
        localSocket.join(adminRoom);
        const inAdmin = io.sockets.adapter.rooms[adminRoom];
        localSocket.on('blog-comment', (msg) => {
            console.log('Someone commented on your blog');
            if (inAdmin.length > 0) {
                localSocket.to(adminRoom).emit('comment-posted', {
                    msg: msg
                })
                returnNotifs(msg)
            } else {
                console.log('No admin yet');
                returnNotifs(msg)
            }
        })
    })
}

export { socketFunction }
