interface OrderList {
    id: number,
    documentId: string,
    order_mode: 'deline' | 'takeout',
    order_list: {
        [key: string]: Menu,
    },
    store: string,
    order_status: 'production' | 'pick_up', 'finished',
    discount: string
}