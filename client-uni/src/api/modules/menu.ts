import { request } from '@/utils/request'



// 获取分店列表
export const getStoreList = () => {
    return new Promise<
        ResponseData<
            Store[]
        >
    >((resolve, reject) => {
        request('/stores', {
            method: 'GET',
        }).then(res => {
            resolve(res as ResponseData<Store[]>)
        })
    })
}



// 获取菜单列表
export const getMenuList = (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            MenuClass[]
        >
    >((resolve, reject) => {
        request('/menu-classes', {
            method: 'GET',
            params
        }).then(res => {
            resolve(res as ResponseData<MenuClass[]>)
        })
    })
}



// 获取需要vip的菜单列表
export const getVipMenuList = () => {
    return new Promise<
        ResponseData<
            Menu[]
        >
    >((resolve, reject) => {
        request('/menus', {
            method: 'GET',
            params: [
                {
                    'populate': 'menu_img',
                    'filters[need_vip]': 'true'
                }
            ]
        }).then(res => {
            resolve(res as ResponseData<Menu[]>)
        })
    })
}



/**
 * 获取菜单详情
 * 
 * @param {String} id 菜品id
 * @returns 
 */
export const getMenuDetail = (
    id: string,
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Menu
        >
    >((resolve, reject) => {
        request(`/menus/${id}`, {
            method: 'GET',
            params
        }).then(res => {
            resolve(res as ResponseData<Menu>)
        })
    })
}



