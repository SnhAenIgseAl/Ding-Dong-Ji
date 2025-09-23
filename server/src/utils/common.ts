
/**
 * 判断店铺是否在营业时间
 * @param storeInfo 
 * @returns 
 */
export const isStoreOpening = (storeInfo) => {
    const openHour = storeInfo.store_opening.toString().split(':')[0]
    const closeHour = storeInfo.store_closing.toString().split(':')[0]
    const now = new Date()
    return parseInt(openHour) <= now.getHours() && now.getHours() < parseInt(closeHour)
}

/**
 * 日期格式化
 */
export const formatDate = (date: Date) => {
    return new Date(date).toLocaleString()
}

/**
 * 数组分组排序
 * @param list 
 * @param key 
 * @returns 
 */
export const groupBy = (list: any[], key: string | Function ) => {

    let keyFn: Function

    if (typeof key === 'string') {
        const prop = key
        keyFn = (item: any) => item[prop]
    } else {
        keyFn = key
    }

    const res = {}
    list.forEach((item, index) => {
        const k = keyFn(item, index, list)
        if (!res[k]) {
            res[k] = []
        }
        res[k].push(item)
    })
    return res
}