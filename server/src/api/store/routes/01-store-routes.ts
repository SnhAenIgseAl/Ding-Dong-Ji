export default {
    routes: [
        {
            method: 'GET',
            path: '/store/me',
            handler: 'store.me',
        },
        {
            method: 'POST',
            path: '/store/update',
            handler: 'store.update',
        },
        {
            method: 'POST',
            path: '/store/bind',
            handler: 'store.bind',
        }
    ]
}