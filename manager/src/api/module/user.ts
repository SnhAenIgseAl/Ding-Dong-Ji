import { useFetch } from '@/utils/request'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { API_URL } from '..'

const getUserStore = async () => {
    return useUserStore()
}

export const login = ({
    identifier,
    password
}: {
    identifier: string
    password: string
}) => {
    return new Promise<
        ResponseData<
            User
        >
    >((resolve, reject) => {
        useFetch('/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        }).then(res => {
            resolve(res as ResponseData<User>)
        })
    })
}

export const getUserInfo = () => {
    return new Promise<User>((resolve, reject) => {
        useFetch('/users/me', {
            method: 'GET'
        }, [
            { 'populate': 'store' }
        ]).then(res => {
            resolve(res as User)
        })
    })
}

// 更新用户信息
export const updateUser = async ({
    username,
    avatar,
}: {
    username?: string,
    avatar?: string,
    }) => {
    const userStore = await getUserStore()
    return new Promise <
        ResponseData <
            User
        >
    > ((resolve, reject) => {
        useFetch('/auth/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    username,
                    avatar
                }
            })
        }).then(res => {
            userStore.setUserInfoAsync()
            resolve(res as ResponseData<User>)
        })
    })
}

// 上传头像
export const uploadAvatar = (file: File) => {
    const fd = new FormData()
    fd.append('files', file)
    console.log(fd.get('files'));

    return new Promise<any>(async (resolve, reject) => {
        const userStore = await getUserStore()
        axios.post(`${API_URL}/upload`, fd, {
            headers: {
                Authorization: `Bearer ${userStore.userToken}`
            }
        }).then(res => {
            resolve(res.data)
        })
    })
}

// 更改邮箱
export const changeEmail = async (email: string) => {
    return new Promise((resolve, reject) => {
        useFetch(`/auth/email-confirmation?confirmation=${email}`, {
            method: 'GET'
        }).then(res => {
            resolve(res)
        })
    })
}

// 忘记密码
export const forgetPassword = async (email: string) => {
    return new Promise<EmailConfirmation>((resolve, reject) => {
        useFetch(`/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        }).then(res => {
            resolve(res as EmailConfirmation)
        })
    })
}

// 修改密码
export const resetPassword = async ({
    code,
    password,
    passwordConfirmation
}: {
    code: string,
    password: string,
    passwordConfirmation: string,
}) => {
    // const userStore = await getUserState()
    return new Promise<LoginData>((resolve, reject) => {
        useFetch(`/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                password,
                passwordConfirmation
            })
        }).then(res => {
            resolve(res as LoginData)
        })
    })
}