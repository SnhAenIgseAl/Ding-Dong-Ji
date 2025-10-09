declare interface MenuClass {
    id:          number;
    documentId:  string;
    class_name:  string;
    createdAt:   ISOISODateStringString;
    updatedAt:   ISOISODateStringString;
    publishedAt: ISOISODateStringString;
    menus:       Menu[];
}

declare interface Menu {
    id:           number;
    documentId:   string;
    menu_name:    string;
    menu_price:   number;
    menu_desc:    null;
    menu_img:     Image;
    createdAt:    ISOISODateStringString;
    updatedAt:    ISOISODateStringString;
    publishedAt:  ISOISODateStringString;
    menu_number:  number;
    need_vip:     boolean;
    menu_flavors: MenuFlavor[];
    stores:       Store[];
}

declare interface MenuFlavor {
    id:          number;
    documentId:  string;
    flavor_name: string;
    flavor_list: string[];
    createdAt:   ISODateString;
    updatedAt:   ISODateString;
    publishedAt: ISODateString;
    flavor:      string;
}

declare interface Store {
    id:            number;
    documentId:    string;
    store_id:      string;
    store_name:    string;
    store_address: string;
    store_opening: string;
    store_closing: string;
    createdAt:     ISODateString;
    updatedAt:     ISODateString;
    publishedAt:   ISODateString;
    is_operation:  boolean;
    user?:         User;
}