<template>
    <div class="login-page">

        <div class="login-form">
            <t-typography-title level="h1">登录到叮咚记</t-typography-title>

            <t-form ref="form" 
                :data="loginForm" 
                :colon="true" 
                :label-width="0" 
                @submit="doLogin"
            >
                <t-form-item name="account">
                    <t-input 
                        v-model="loginForm.identifier" 
                        clearable 
                        placeholder="请输入邮箱"
                    >
                        <template #prefix-icon>
                            <desktop-icon />
                        </template>
                    </t-input>
                </t-form-item>

                <t-form-item name="password">
                    <t-input 
                        v-model="loginForm.password" 
                        type="password" 
                        clearable 
                        placeholder="请输入密码"
                    >
                        <template #prefix-icon>
                            <lock-on-icon />
                        </template>
                    </t-input>
                </t-form-item>

                <t-form-item>
                    <t-button theme="primary" type="submit" block>登录</t-button>
                </t-form-item>
            </t-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { login } from '@/api';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter()

const {
    userToken,
    userState,
    isLogin
} = storeToRefs(useUserStore())
const {
    setUserInfoAsync
} = useUserStore()

const loginForm = reactive({
    identifier: 'admin@qq.com',
    password: '123654'
})

const doLogin = async () => {
    const res = await login(loginForm)
    console.log(res);

    if (res.user) {
        MessagePlugin.success('登录成功')
        userToken.value = res.jwt
        isLogin.value = true
        await setUserInfoAsync()

        router.push('/total')
    } else {
        MessagePlugin.error('用户名或密码错误')
    }
}

</script>

<style scoped>
.login-page {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../../assets//images/assets-login-bg-white-DhCleFXy.avif');
}

.login-form {
    position: absolute;
    width: 400px;
    top: 50%;
    left: 160px;
    transform: translateY(-50%);
}
</style>