<template>
    <Navbar title="首页"/>

    <view class="swiper">
        <wd-swiper 
            :list="swiperList" 
            autoplay
            height="600rpx"
            :indicator="{ type: 'dots-bar' }" 
        />
    </view>

    <view class="page home">

        <view class="title">餐厅</view>
        <view style="margin: -32rpx;">
            <ChooseStore />
        </view>
        

        <view class="title">点餐</view>
        <view class="ctx-1 order-mode">
            <view 
                class="text" 
                @click="outside"
            >
                <wd-img :src="outsideImg" width="96rpx" height="96rpx" mode="aspectFill" />
                外送点餐
            </view>
            <view 
                class="text" 
                @click="arrive"
            >
                <wd-img :src="dineImg" width="96rpx" height="96rpx" mode="aspectFill" />
                到店取餐
            </view>
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
import { getHomeData } from '@/api/index'
import { useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { goTo } from '@/utils/common'
import ChooseStore from '@/components/ChooseStore.vue'

const {
	orderMode
} = storeToRefs(useShoppingStore())

const imgList = ref<Image[]>([])
const swiperList = ref<string[]>([])
const outsideImg = ref<string>()
const dineImg = ref<string>()
const imgListLoad = ref<boolean>(true)

getHomeData([
    { 'populate': '*' }
]).then(res => {
    imgList.value = res.data.goods_img
    res.data.swiper_img.map(item => {
        swiperList.value.push(item.url)
    })
    outsideImg.value = res.data.outside_icon.url
    dineImg.value = res.data.dine_icon.url
    imgListLoad.value = false
})

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

.order-mode {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    // padding: 32rpx;
}

.text {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 90rpx;
}

.ctx-3 {
    display: flex;
    flex-flow: column nowrap;
    gap: 32rpx;
    width: 100%;
    height: auto;
}
</style>