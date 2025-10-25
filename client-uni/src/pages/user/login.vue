<template>
    <Navbar title="登录"/>
    <wd-card>
        <template #title>
            <view class="title">登录</view>
        </template>
        <wd-form ref="form" :model="loginForm">
            <wd-cell-group border>
                <wd-input
                    label="邮箱"
                    label-width="100px"
                    prop="identifier"
                    clearable
                    v-model="loginForm.identifier"
                    placeholder="请输入邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
                />
                <wd-input
                    label="密码"
                    label-width="100px"
                    prop="password"
                    show-password
                    clearable
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
            </wd-cell-group>
        </wd-form>
        <template #footer>
            <wd-button block @click="doLogin">登录</wd-button>
        </template>
    </wd-card>
    <wd-toast />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/Navbar.vue'
import { userLogin } from '@/api/index'
import { back } from '@/utils/common'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const {
    userToken
} = storeToRefs(useUserStore())

const {
    setUserInfoAsync
} = useUserStore()

const form = ref()
const loginForm = reactive({
    identifier: 'a@qq.com',
    password: '123654'
})

const doLogin = async () => {
    const validate = await new Promise<boolean>((resolve, reject) => {
        form.value
            .validate()
            .then(({ valid, errors }) => {
                if (!valid) {
                    toast.error(errors[0].message)
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
    if (!validate) { 
        return
    }

    const data = await userLogin(loginForm)

    if (data.user) {
        toast.success('登录成功')
        userToken.value = data.jwt
        await setUserInfoAsync()
        back()
    } else {
        toast.error('用户名或密码错误')
    }
}
</script>

<style scoped>

.bg {
    background-color: #F8F8F8;
    margin: 0 32rpx;
}

.wx-login {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60rpx;
    background-color: orange;
}

</style>