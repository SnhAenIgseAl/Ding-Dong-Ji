import { useFetch } from "@/utils/request"

// 获取菜单列表
export const getMenuList = (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Menu[]
        >
    >((resolve, reject) => {
        useFetch('/menus',
            { method: 'GET' },
            params
        ).then(res => {
            resolve(res as ResponseData<Menu[]>)
        })
    })
}

/**
 * 更改菜品状态（上架 | 售空）
 * @param id 菜品id
 * @param action 0为售空，1为上架
 * @returns 
 */
export const changeMenuOwn = (
    id: string,
    action: 0 | 1
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch(`/menu/changeStoreOwn/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: action
            })
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}