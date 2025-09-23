interface User {
    id: number,
    documentId: string,
    username: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}

interface StrapiResponseMeta {
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}