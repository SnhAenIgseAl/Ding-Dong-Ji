declare interface UserInfo {
    id:          number;
    documentId:  string;
    username:    string;
    email:       string;
    provider:    string;
    confirmed:   boolean;
    blocked:     boolean;
    createdAt:   ISODateString;
    updatedAt:   ISODateString;
    publishedAt: ISODateString;
    vip:         VideoPixelFormat;
    avatar:      string;
    store:       Store;
}

declare interface VIP {
    VIP_level:   number;
    id:          number;
    documentId:  string;
    deadline:    ISODateString;
    createdAt:   ISODateString;
    updatedAt:   ISODateString;
    publishedAt: ISODateString;
}

declare interface UserError {
    data: null,
    error: {
        status:  number,
        name:    string,
        message: string,
        details: {}
    }
}

declare type User = UserInfo & UserError

declare interface Image {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         ISODateString;
    updatedAt:         ISODateString;
    publishedAt:       ISODateString;
}

declare interface Formats {
    thumbnail: Large;
    medium:    Large;
    small:     Large;
    large:     Large;
}

declare interface Large {
    name:        string;
    hash:        string;
    ext:         string;
    mime:        string;
    path:        null;
    width:       number;
    height:      number;
    size:        number;
    sizeInBytes: number;
    url:         string;
}
