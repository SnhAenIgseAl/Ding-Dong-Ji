<template>
    <Navbar title="重置密码" />
    <wd-card>
        <template #title>
            <view class="title">重置密码</view>
        </template>
        <view>
            点击重置密码按钮后将发送一封邮件到注册的邮箱，点击邮箱中的链接即可重置密码
        </view>
        <template #footer>
            <wd-button @click="send">重置密码</wd-button>
        </template>
    </wd-card>
    <wd-toast />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { forgotPassword } from '@/api/index'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const send = () => {
    forgotPassword().then(res => {
        if (res.ok) {
            toast.success('发送成功')
        }
    })
}

</script>

<style scoped>
</style>