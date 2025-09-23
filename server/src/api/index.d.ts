interface StrapiResponse<T = {}> {
    data: Array<T>,
    meta?: {
        pagination?: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        },
        error?: {
            status: number,
            message: string
        }
    }
}

interface OrderID {
    [key: string]: number
}