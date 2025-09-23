module.exports = {
    routes: [
        {
            method: "POST",
            path: "/comment/like/:id",
            handler: "comment.likeAction",
        },
        {
            method: 'POST',
            path: '/comment/delete/:id',
            handler: 'comment.delete'
        }
    ]
}  