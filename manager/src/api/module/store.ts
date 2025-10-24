import { useFetch } from "@/utils/request"
import { AK, API_URL } from '@/config/request.config'

interface StoreInfo {
    store_address: string
    store_name: string
    store_opening: string
    store_closing: string
    longitude: number
    latitude: number
}

/**
 * 获取自己管理的分店信息
 */
export const getStoreInfo = async () => {
    return new Promise<
        ResponseData<
            Store
        >  
    >((resolve, reject) => {
        useFetch(`/store/me`, {
            method: 'GET'
        }).then(res => {
            resolve(res as ResponseData<Store>) 
        })
    })
}

/**
 * 获取分店列表
 */
export const getStoreList = () => {
    return new Promise<ResponseData<Store[]>>((resolve, reject) => {
        useFetch('/stores', {
            method: 'GET'
        }).then(res => {
            resolve(res as ResponseData<Store[]>)
        })
    })
}


/**
 * 创建分店
 */
export const createStore = (
    data: StoreInfo,
    token: string
) => {
    return new Promise<ResponseData<Store>>((resolve, reject) => {
        fetch(`${API_URL}/stores`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ...data
                }
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            resolve(res as ResponseData<Store>)
        })
    })
}

/**
 * 绑定分店
 */
export const bindStore = (
    documentId: string
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch('/store/bind', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    documentId
                }
            })
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}

/**
 * 更新分店信息
 */
export const updateStoreInfo = (
    data: StoreInfo
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch('/store/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ...data
                }
            })
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}

/**
 * 根据关键词获取地址及坐标信息
 */
export const getCoordinate = (
    keyword: string,
    city: string
) => {
    return new Promise<any>((resolve, reject) => {
        fetch(`/map-api/place/v3/suggestion?query=${keyword}&region=${city}&region_limit=true&ak=${AK}`, {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).then(res => {
            resolve(res as any)
        })
    })
}