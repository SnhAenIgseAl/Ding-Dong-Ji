import { request } from "@/utils/request"
import { useUserStore } from "@/stores"

// 获取地址列表
export const getAddressList = () => {
    return new Promise<
        ResponseData<
            Address[]
        >
    >((resolve, reject) => {
        request('/addresses', {
            method: 'GET',
        }).then(res => {
            resolve(res as ResponseData<Address[]>)
        })
    })
}

// 添加地址
export const addAddress = ({
    address_detail,
    phone
}: {
    address_detail: string,
    phone: string
}) => {
    return new Promise<
        ResponseData<
            Address
        >
    >(async (resolve, reject) => {
        // const userStore = await getUserStore()
        request('/addresses', {
            method: 'POST',
            data: {
                data: {
                    address_detail,
                    phone,
                    // user: userStore.userState!.id
                }
            }
        }).then(res => {
            resolve(res as ResponseData<Address>)
        })
    })
}

// 删除地址
export const deleteAddress = (
    id: string
) => {
    return new Promise<
        ResponseData
    >((resolve, reject) => {
        request(`/address/delete/${id}`, {
            method: 'POST',
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}

// 修改地址
export const updateAddress = ({
    address_detail,
    phone,
    id
}: {
    address_detail: string,
    phone: string
    id: string
}) => {
    return new Promise<
        ResponseData<
            Address
        >
    >(async (resolve, reject) => {
        // const userStore = await getUserStore()
        request(`/addresses/${id}`, {
            method: 'PUT',
            data: {
                data: {
                    address_detail,
                    phone
                }
            }
        }).then(res => {
            resolve(res as ResponseData<Address>)
        })
    })
}