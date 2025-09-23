import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/index'



export const useUserStore = defineStore('user', () => {

	// 用户信息状态
	const userState = ref<User | null>(null)

	// 用户凭证
	const userToken = ref<string>('')

	// 用户登录状态
	const isLogin = ref<boolean>(false)

	// 默认头像
	const defaultAvatar = ref<string>('http://localhost:1337/uploads/57_B1199_FFBC_07_B58_FDB_6_BBD_6425_AC_09_C_319e9de9d4.jpg')

	// 用户收获地址
	const userAddress = ref<Address | null>(null)

	// 设置用户信息状态
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

	// 获取用户状态信息
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
	const logout = async () => {
		userState.value = null
		userToken.value = ''
		userAddress.value = null
		isLogin.value = false
	}

	return {
		userState,
		userToken,
		isLogin,
		defaultAvatar,
		userAddress,
		setUserInfoAsync,
		getUserStateAsync,
		logout
	}
}, {
	persist: true
})