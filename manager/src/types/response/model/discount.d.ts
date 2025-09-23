declare interface Discount {
    id:            number;
    documentId:    string;
    reach:         number;
    subtract:      number;
    deadline:      ISODateString;
    createdAt:     ISODateString;
    updatedAt:     ISODateString;
    publishedAt:   ISODateString;
    discount_name: string;
    is_used:       boolean;
}