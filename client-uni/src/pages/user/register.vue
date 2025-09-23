<template>
    <Navbar title="注册" />
    <wd-card>
        <template #title>
            <view class="title">注册</view>
        </template>
        <wd-form ref="form" :model="registerForm">
            <wd-cell-group border>
                <wd-input
                    label="用户名"
                    label-width="100px"
                    prop="username"
                    clearable
                    v-model="registerForm.username"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请输入用户名' }]"
                />
                <wd-input
                    label="邮箱"
                    label-width="100px"
                    prop="email"
                    clearable
                    v-model="registerForm.email"
                    placeholder="请输入邮箱"
                    :rules="[{ required: true, message: '请输入邮箱' }]"
                />
                <wd-input
                    label="密码"
                    label-width="100px"
                    prop="password"
                    show-password
                    clearable
                    v-model="registerForm.password"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
            </wd-cell-group>
        </wd-form>
        <template #footer>
            <wd-button block @click="doRigister">注册</wd-button>
        </template>
    </wd-card>
    <wd-toast />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { reactive } from 'vue'
import { userRegister } from '@/api/index'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const form = ref()
const registerForm = reactive({
    username: '',
    email: '',
    password: ''
})

const doRigister = async () => {
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

    const registerData = await userRegister(registerForm)

    if (registerData.user) {
        toast.success('注册成功')
    } else {
        toast.error('注册失败')
    }
    
}

</script>

<style scoped>

.bg {
    background-color: #F8F8F8;
    margin: 0 32rpx;
}

</style>