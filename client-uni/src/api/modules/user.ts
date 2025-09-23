import { request } from '@/utils/request'
import { useUserStore } from '@/stores/index'

const getUserState = async () => {
    const userStore = useUserStore()
    return userStore
}

// 注册
export const userRegister = ({
    username,
    email,
    password,
}: {
    username: string,
    email: string,
    password: string,
}) => {
    return new Promise<LoginData>((resolve, reject) => {
        request('/auth/local/register', {
            method: 'POST',
            data: {
                username,
                email,
                password
            }
        })!.then(res => {
            resolve(res as LoginData)
        })
    })
}



// 登录
export const userLogin = ({
    identifier,
    password,
}: {
    identifier: string,
    password: string,
}) => {
    return new Promise<LoginData>((resolve, reject) => {
        request('/auth/local', {
            method: 'POST',
            data: {
                identifier,
                password
            }
        }).then(res => {
            resolve(res as LoginData)
        })
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return new Promise<User>((resolve, reject) => {
        request('/users/me', {
            method: 'GET',
            params: [
                { 'populate': 'vip' }
            ]
        }).then(res => {
            resolve(res as User)
        })
    })
}

// 修改用户信息
export const updateUser = async ({
    username,
    avatar
}: {
    username?: string,
    avatar?: number,
}) => {
    const userStore = await getUserState()
    return new Promise<User>(async (resolve, reject) => {
        request('/auth/update', {
            method: 'POST',
            data: {
                data: {
                    username,
                    avatar
                }
            }
        }).then(res => {
            userStore.setUserInfoAsync()
            resolve(res as User)
        })
    })
}

// 忘记密码
export const forgotPassword = async () => {
    const userStore = await getUserState()
    return new Promise<EmailData>((resolve, reject) => {
        request('/auth/forgot-password', {
            method: 'POST',
            data: {
                email: userStore.userState!.email
            }
        }).then(res => {
            resolve(res as EmailData)
        })
    })
}

// 修改密码
export const resetPassword = async ({
    password,
    passwordConfirmation
}: {
    password: string,
    passwordConfirmation: string,
}) => {
    return new Promise((resolve, reject) => {
        request(`/auth/reset-password`, {
            method: 'POST',
            data: {
                password,
                passwordConfirmation
            }
        }).then(res => {
            resolve(res)
        })
    })
}

// 成为狗椒大会员
export const getVip = async () => {
    return new Promise<ResponseData>((resolve, reject) => {
        request('/auth/vip/get', {
            method: 'POST'
        }).then(res => {
            resolve(res as ResponseData)
        })
    })
}