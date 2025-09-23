declare interface Order {
    id:           number;
    documentId:   string;
    order_price:  number;
    createdAt:    Date;
    updatedAt:    Date;
    publishedAt:  Date;
    order_mode:   OrderMode;
    order_list:   OrderList;
    order_status: OrderStatus;
    order_id:     string;
    discount:     Discount;
    store:        Store;
}

declare type OrderMode =
    'outside' | // 外卖
    'arrive' |  // 到店
    'takeout' | // 到店外带
    'dine_in'   // 到店堂食

declare type OrderStatus =
    'production' |  // 制作中
    'delivering' |  // 配送中
    'pick_up' |     // 可取餐
    'finished' |    // 已完成
    'canceled'      // 已取消
    
declare type OrderList = {
    [key: string]: Menu
}

declare interface OrderWithFormatDate extends Order {
    createdAt:    String;
    updatedAt:    String;
    publishedAt:  String;
}

// declare interface OrderList {
//     id:            number;
//     documentId:    string;
//     menu_name:     string;
//     menu_price:    number;
//     menu_desc:     null;
//     available:     boolean;
//     createdAt:     ISODateString;
//     updatedAt:     ISODateString;
//     publishedAt:   ISODateString;
//     menu_number:   number;
//     menu_flavors?: Flavor[];
//     flavor?:       Flavor[];
//     need_vip?:     boolean;
// }