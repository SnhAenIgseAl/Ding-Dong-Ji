declare interface Home {
    id:              number;
    documentId:      string;
    createdAt:       ISODateString;
    updatedAt:       ISODateString;
    publishedAt:     ISODateString;
    goods_img:       Image[];
    vip_page_bg:     Image;
}