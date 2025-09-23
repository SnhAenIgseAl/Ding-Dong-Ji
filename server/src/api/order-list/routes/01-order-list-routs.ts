export default {
    routes: [
        {
            method: "POST",
            path: "/order-list/set/:id",
            handler: "order-list.setStatus",
        },
        {
            method: "GET",
            path: "/order-list/finish/:id",
            handler: "order-list.finish",
        }
    ]
}