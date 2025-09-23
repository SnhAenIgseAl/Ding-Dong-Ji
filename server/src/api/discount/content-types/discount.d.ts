declare interface Discount {
    id:          number;
    documentId:  string;
    reach:       number;
    subtract:    number;
    deadline:    Date;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}