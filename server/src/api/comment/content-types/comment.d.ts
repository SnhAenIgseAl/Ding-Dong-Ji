interface Comments {
    id: number,
    documentId: string,
    comment_text: string,
    like_count: number,
    is_shadowban: boolean,
    sub_comments: Comment[],
    user: User
}

interface WithoutShadowbanComment extends Omit<Comments[], 'is_shadowban'> { }

interface CommentLike {
    id: number,
    documentId: string
    comment: Comment
}