import { request } from "@/utils/request"

// 获取评论列表
export const getCommentsList = () => {
    return new Promise<
        ResponseData<
            Comment[]
        >
    >((resolve, reject) => {
        request('/comments', {
            method: 'GET',
            params: [
                { 'populate': 'user'},
                { 'populate': 'root_comment' },
                { 'populate': 'sub_comments' },
                { 'populate': 'sub_comments.user' },
                { 'populate': 'comment_likes' },
                { 'populate': 'comment_likes.user' },
                { 'filters[root_comment][$null]': 'true' }
            ]
        }).then(res => {
            resolve(res as ResponseData<Comment[]>)
        })
    })
}

// 获取子评论列表
export const getSubComments = (
    id: string
) => {
    return new Promise<
        ResponseData<
            Comment[]
        >
    >((resolve, reject) => {
        request(`/comments`, {
            method: 'GET',
            params: [
                { 'populate': 'user' },
                { 'populate': 'root_comment' },
                { 'populate': 'sub_comments' },
                { 'populate': 'sub_comments.user' },
                { 'populate': 'comment_likes' },
                { 'populate': 'comment_likes.user' },
                { 'filters[root_comment][documentId][$eq]': id }
            ]
        }).then(res => {
            resolve(res as ResponseData<Comment[]>)
        })
    })
}

// 点赞评论
export const likeComment = ({
    id,
    action
}: {
    id: string,
    action: 0 | 1
}) => {
    return new Promise<ResponseData>((resolve, reject) => {
        request(`/comment/like/${id}`, {
            method: 'POST',
            data: {
                data: {
                    action
                }
            }
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}

// 回复 | 发表评论
export const replyComment = async ({
    root_comment,
    comment_text,
}: {
    root_comment?: string,
    comment_text: string
}) => {
    return new Promise<
        ResponseData<
            Comment
        >
    >((resolve, reject) => {
        request(`/comments`, {
            method: 'POST',
            data: {
                data: {
                    root_comment,
                    comment_text,
                }
            }
        }).then(res => {
            resolve(res as ResponseData<Comment>)
        })
    })
}

// 删除评论
export const deleteComment = (
    id: string
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        request(`/comment/delete/${id}`, {
            method: 'POST',
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}