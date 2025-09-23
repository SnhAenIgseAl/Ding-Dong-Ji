declare interface Comment {
    id:            number;
    documentId:    string;
    comment_text:  string;
    createdAt:     ISODateString;
    updatedAt:     ISODateString;
    publishedAt:   ISODateString;
    is_shadowban:  boolean;
    like_count:    number;
    root_comment:  Comment;
    sub_comments:  Comment[];
    user:          User;
}