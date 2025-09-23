import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'


export const useUserStore = defineStore('user', () => {

	// 分店管理员信息状态
	const userState = ref<User | null>(null)

	// 分店管理员凭证
	const userToken = ref<string>('')

	// 分店管理员登录状态
	const isLogin = ref<boolean>(false)

	// 设置管理员信息状态
	const setUserInfoAsync = async () => {
		return new Promise<User>(async (resolve, reject) => {
			if (userToken.value) {
				let res = await getUserInfo()
				if (res.error) {
					userState.value = null
					isLogin.value = true
				} else {
					userState.value = res
					isLogin.value = true
					resolve(userState.value as User)
				}
			}
		})
	}

	// 获取管理员状态信息
	const getUserStateAsync = async () => {
		return new Promise<User>(async (resolve, reject) => {
			if (userToken.value) {
				let res = await getUserInfo()
				if (res.error) {
					userState.value = null
					isLogin.value = false
				} else {
					userState.value = res
					isLogin.value = true
					resolve(userState.value as User)
				}
			}
		})
	}

	// 登出
	const logout = () => {
		userState.value = null
		userToken.value = ''
		isLogin.value = false
	}

	return {
		userState,
		userToken,
		isLogin,
		setUserInfoAsync,
		getUserStateAsync,
		logout
	}
}, {
	persist: true
})