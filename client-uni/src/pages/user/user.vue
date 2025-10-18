<template>
    <Navbar title="用户"/>

    <view class="bg">
        <wd-img 
            width="100%" 
            height="360rpx" 
            mode="aspectFill"
            :src="userAvatar" 
        />
    </view>

    <view class="user-page">
        <view class="user-content">
            <view class="user-info">
                <wd-img 
                    width="120rpx" 
                    height="120rpx" 
                    mode="aspectFill"
                    round
                    :src="userAvatar" 
                />
                <view v-if="isLogin && userState">
                    {{ userState.username }}
                </view>
                <view v-else>
                    <wd-button @click="goTo('/pages/user/login')">
                        立即登录
                    </wd-button>
                </view>
            </view>

            <wd-grid v-if="isLogin" clickable>
                <wd-grid-item icon="picture" text="优惠券" url="/pages/discount/discount?from=user" />
                <wd-grid-item icon="picture" text="地址管理" url="/pages/address/address" />
                <wd-grid-item icon="picture" text="我的订单" url="/pages/order/list" />
            </wd-grid>
            
            <CellGroup 
                v-if="isLogin" 
                title="基本信息" 
                :cell="infoGroup" 
            />

            <CellGroup 
                title="用户页面（方便调试）" 
                :cell="userGroup" 
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import CellGroup from '@/components/CellGroup.vue'
import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { goTo } from '@/utils/common'

const {
    userState,
    isLogin,
    defaultAvatar
} = storeToRefs(useUserStore())
const {
    setUserInfoAsync
} = useUserStore()

if (!isLogin.value) {
    goTo('/pages/user/login')
} else {
    setUserInfoAsync()
}

const userAvatar = computed(() => {
    if (isLogin.value) {
        return userState.value!.avatar
    } else {
        return defaultAvatar.value
    }
})

const infoGroup = [
    {
        title: '修改信息',
        to: '/pages/user/pages/updateUser'
    },
    {
        title: '更换头像',
        to: '/pages/user/pages/updateAvatar'
    },
    {
        title: '重置密码',
        to: '/pages/user/pages/forgotPassword'
    }
]

const userGroup = [
    {
        title: '登录页',
        to: '/pages/user/login'
    },
    {
        title: '注册页',
        to: '/pages/user/register'
    }
]

</script>

<style lang="scss" scoped>

.bg {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 360rpx;
    border-bottom-left-radius: 32rpx;
    border-bottom-right-radius: 32rpx;
    overflow: hidden;
}

.user-page {
    position: relative;
    z-index: 2;
    margin-top: 360rpx;
    padding: 32rpx;
    height: auto;
    background-color: #fff;
    box-sizing: border-box;
    border-top-left-radius: 32rpx;
    border-top-right-radius: 32rpx;
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.3);
}

.user-content {
    position: relative;
    z-index: 3;
    margin-top: -130rpx;
    box-sizing: border-box;
}

.user-info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 32rpx;
    margin-bottom: 32rpx;
    padding: 32rpx;
    background-color: #fff;
    border-radius: 32rpx;
    box-sizing: border-box;
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.3);
}

</style>