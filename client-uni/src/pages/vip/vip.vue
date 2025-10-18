<template>
    <Navbar title="狗椒大会员" />
    <view class="vip-page">
        <view class="title">狗椒大会员专享</view>
        <scroll-view scroll-x="true">
            <view style="display: flex; gap: 32rpx;">
                <ShowLayout 
                    v-for="item in vipMenuList"
                    :key="item.documentId"
                    mode="card"
                    :img="item.menu_img.url"
                    :title="item.menu_name"
                    :content="`${item.menu_price}元`"
                />
            </view>
        </scroll-view>

        <view class="title">狗椒大会员专享</view>
        <ShowLayout 
            v-for="item in vipMenuList"
            :key="item.documentId"
            :img="item.menu_img.url"
            :title="item.menu_name"
            :content="`${item.menu_price}元`"
        />
    </view>

    <view class="button-group">
        <view class="button get-discount" @click="discountVisible = true">领取优惠券</view>
        <view class="button get-vip" @click="handleGetVip">成为狗椒大会员</view>
    </view>

    <wd-toast />
    <wd-curtain 
        v-model="discountVisible" 
        :src="`${BASE_SERVER_URL}/uploads/discount_cf1fbb2cdf.png`" 
        close-position="bottom-right"
        :width="280"
        @click="handlerGetDiscount"
        @close="discountVisible = false"
    />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getVip, getDiscount, getVipMenuList, BASE_SERVER_URL } from '@/api/index'
import { useToast } from 'wot-design-uni'
import ShowLayout from '@/components/ShowLayout.vue'

const toast = useToast()

const vipMenuList = ref<Menu[]>()

getVipMenuList().then((res) => {
    vipMenuList.value = res.data
})

const discountVisible = ref(false)


const handleGetVip = () => {
    getVip().then((res) => {
        if (res.code === 0) {
            toast.success('成为狗椒大会员成功')
        } else {
            toast.error(res.message!)
        }
    })
}

/**
 * 唉，抽卡
 */
const handlerGetDiscount = () => {
    getDiscount().then((res) => {
        if (res.code === 0) {
            toast.success(`获得${res.data.discount_name}优惠券`)
        } else {
            toast.error(res.message!)
        }
    })
}

</script>

<style scoped lang="scss">
.vip-page {
    width: 100%;
    padding: 32rpx;
    padding-bottom: 136rpx;
    box-sizing: border-box;
}

.button-group {
    position: fixed;
    bottom: 84px;
    display: flex;
    width: 100%;
    height: 136rpx;
    padding: 32rpx;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 32rpx;
    border-top: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;

    .button {
        text-align: center;
        line-height: 72rpx;
        flex: 1;
        height: 72rpx;
        border-radius: 1000rpx;
    }
}

.get-vip {
    background-color: #333;
    color: orange;
    font-weight: bold;
}

.get-discount {
    border: 1px solid brown;
    color: brown;
}
</style>