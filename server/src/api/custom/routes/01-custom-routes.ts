module.exports = {
    routes: [
        {
            method: "POST",
            path: "/auth/update",
            handler: "custom.updateMe",
        },
        {
            method: "POST",
            path: "/auth/vip/get",
            handler: "custom.getVip",
        },
        {
            method: "GET",
            path: "/total/recent",
            handler: "custom.getTotalRecent",
        },
        {
            method: "GET",
            path: "/total/today",
            handler: "custom.getTotalToday",
        }
    ]
}