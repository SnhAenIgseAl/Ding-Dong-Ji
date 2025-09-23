import { useFetch } from "@/utils/request"

// 获取评论列表
export const getCommentList = (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Comment[]
        >
    >((resolve, reject) => {
        useFetch('/comments', {
            method: 'GET',
        }, params).then((res) => {
            resolve(res as ResponseData<Comment[]>)
        })
    })
}

// 更新评论
export const updateComment = ({
    id,
    params,
    is_shadowban
}: {
    id: string,
    params?: RequestParams[],
    is_shadowban?: boolean
}) => {
    return new Promise<
        ResponseData<
            Comment
        >
    >((resolve, reject) => {
        useFetch(`/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    is_shadowban
                }
            })
        }, params).then((res) => {
            resolve(res as ResponseData<Comment>)
        })
    })
}

// 删除评论
export const deleteComment = (
    id: string,
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch(`/comment/delete/${id}`, {
            method: 'POST',
        }).then((res) => {
            resolve(res)
        })
    })
}