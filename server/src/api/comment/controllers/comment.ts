/**
 * comment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({

    // 发表 | 回复评论
    async create(ctx) {
        const userId = ctx.state.user.documentId
        const { data } = ctx.request.body

        const res = await strapi.documents('api::comment.comment').create({
            data: {
                ...data,
                user: userId
            },
            status: 'published'
        })

        return {
            code: 0,
            message: '评论成功',
            data: res
        }
    },

    // 点赞
    async likeAction(ctx) {
        const { action } = ctx.request.body.data
        const { data } = await super.findOne(ctx)
        const like_count = data.like_count

        const likeRes = await strapi.documents('api::comment-like.comment-like').findFirst({
            filters: {
                comment: {
                    documentId: {
                        $eq: data.documentId
                    }
                },
                user: {
                    documentId: {
                        $eq: ctx.state.user.documentId
                    }
                }
            }
        })

        if (action) {
            if (likeRes) {
                return {
                    code: -101,
                    message: '已点赞'
                }
            } else {
                await strapi.documents('api::comment-like.comment-like').create({
                    data: {
                        comment: data.documentId,
                        user: ctx.state.user.documentId
                    },
                    status: 'published'
                })
                ctx.request.body.data = {
                    like_count: like_count + 1
                }
                await super.update(ctx)
                return {
                    code: 0,
                    message: '点赞成功',
                }
            }
        } else {
            if (likeRes) {
                await strapi.documents('api::comment-like.comment-like').delete({
                    documentId: likeRes.documentId
                })
                ctx.request.body.data = {
                    like_count: like_count - 1
                }
                await super.update(ctx)
                return {
                    code: 0,
                    message: '取消点赞成功',
                }  
            } else {
                return {
                    code: -102,
                    message: '未点赞'
                }
            }
        }
    },

    // 删除评论
    async delete(ctx) {
        const data = await strapi.documents('api::comment.comment').findOne({
            documentId: ctx.params.id,
            populate: 'sub_comments'
        })

        if (!data) {
            return {
                code: -1,
                message: '评论不存在'
            }
        }

        if (data.sub_comments.length > 0) {
            return {
                code: -2,
                message: '该评论有子评论，无法删除'
            }
        }

        await strapi.documents('api::comment.comment').delete({
            documentId: ctx.params.id
        })

        return {
            code: 0,
            message: '删除成功'
        }
    }
}));

const shadowbanFilter = (comments, ctx) => {
    let tempComments: Omit<Comments[], 'is_shadowban'> = []

    if (ctx.state.user) {
        const userId = ctx.state.user.documentId;
        tempComments = comments.filter(result => {
            if (userId === result.user.documentId) {
                return result
            }

            if (!result.is_shadowban) {
                return result
            }
        });
    } else {
        tempComments = comments.filter(result => {
            if (!result.is_shadowban) {
                return result
            }
        });
    }

    return tempComments.map(result => {
        const { is_shadowban, ...rest } = result;
        return rest;
    });
}