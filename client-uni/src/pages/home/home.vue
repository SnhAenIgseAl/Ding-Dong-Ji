<template>
    <Navbar title="首页"/>
    <view class="page">

        <view class="title">餐厅</view>
        <view style="margin: -32rpx;">
            <ChooseStore />
        </view>
        

        <view class="title">点餐</view>
        <view class="ctx-1">
            <wd-row>
                <wd-col :span="12">
                    <view 
                        class="text" 
                        @click="outside">
                        外送点餐
                    </view>
                </wd-col>
                <wd-col :span="12">
                    <view 
                        class="text" 
                        @click="arrive">
                        到店取餐
                    </view>
                </wd-col>
            </wd-row>
        </view>

        <view class="ctx-2">
            <wd-row>
                <wd-col :span="4">
                    <!-- <wd-icon
                        v-for="(iconItem, iconIndex) in iconList"
                        :key="iconIndex"
                        :name="iconItem.name"
                        size="36px"
                    /> -->
                </wd-col>
            </wd-row>
        </view>

        <view class="title">推荐</view>
        <view class="ctx-3" v-if="imgList">
            <wd-skeleton 
                v-if="imgListLoad"
                :row-col="[
                    { height: '360rpx', width: '100%' },
                    { height: '360rpx', width: '100%' }
                ]"
                :loading="imgListLoad"
                animation="gradient"
            />

            <wd-img 
                v-else
                v-for="(imgItem, imgIndex) in imgList"
                :key="imgIndex"
                width="100%"
                height="360rpx"
                radius="16rpx"
                mode="aspectFill"
                :src="imgItem.url"
            />
        </view>

    </view>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import { getHomeData, BASE_SERVER_URL } from '@/api/index'
import { useUserStore, useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { goTo } from '@/utils/common'
import ChooseStore from '@/components/ChooseStore.vue'

const {
	orderMode
} = storeToRefs(useShoppingStore())

const {
    isLogin
} = useUserStore()

if (!isLogin) {
    goTo('/pages/user/login')
}

const imgList = ref<Image[]>([])
const imgListLoad = ref<boolean>(true)

getHomeData([
    { 'populate': '*' }
]).then(res => {
    imgList.value = res.data.goods_img
    imgListLoad.value = false
})

const iconList = [
    {
        name: "add-circle"
    },
    {
        name: "add-circle"
    },
    {
        name: "add-circle"
    },
    {
        name: "add-circle"
    },
    {
        name: "add-circle"
    }
]

const outside = () => {
    orderMode.value = 'outside'
    goTo('/pages/menu/menu')
}

const arrive = () => {
    orderMode.value = 'dine_in'
    goTo('/pages/menu/menu')
}

</script>

<style lang="scss" scoped>
.ctx-1 {
    width: 100%;
    height: 240rpx;
    border-radius: 16rpx;
    border: 1rpx solid #ccc;
}

.text {
    text-align: center;
    line-height: 240rpx;
}

.ctx-3 {
    display: flex;
    flex-flow: column nowrap;
    gap: 32rpx;
    width: 100%;
    height: auto;
}
</style>