<template>
    <Navbar title="订单信息" />

    <wd-toast />

    <view class="sub-page" style="background-color: #fff;">
        <view v-if="orderInfo && !isPicked && orderMode !== 'outside'" class="pick-up_qrcode">
            <wd-text color="#333" size="32rpx" text="取餐码" />
            <wd-img 
                v-if="qrCodeImg !== ''"
                width="480rpx"
                height="480rpx"
                :src="qrCodeImg"
            />
            <l-qrcode 
                v-show="false"
                useCanvasToTempFilePath 
                @success="onQrCodeSuccess"
                :value="`${BASE_URL}/order-list/finish/${documentId}`" 
                size="480rpx" 
            />
        </view>

        <view v-if="orderMode === 'outside'">
            <map 
                class="map"
                :latitude="latitude" 
                :longitude="longitude" 
                :markers="covers" 
            />
        </view>

        <view v-if="orderInfo" class="order-info" :class="{'margin-top-300': orderMode === 'outside'}">
            <wd-card>
                <template #title>
                    <view class="title">订单状态</view>
                </template>
                <wd-text color="#333" size="32rpx" :text="orderInfo.order_id" />
                <wd-text type="warning" size="32rpx" v-if="orderStatus === 'production'" text="制作中" />
                <wd-text type="warning" size="32rpx" v-if="orderStatus === 'delivering'" text="配送中" />
                <wd-text type="success" size="32rpx" v-if="orderStatus === 'pick_up'" text="待取餐" />
                <wd-text size="32rpx" v-if="orderStatus === 'finished'" text="已完成" />
                <template #footer />
            </wd-card>

            <wd-card>
                <template #title>
                    <view class="title">订单信息</view>
                </template>
                <ShowLayout 
                    v-for="item in orderInfo.order_list"
                    :key="item.documentId"
                    :title="`${item.menu_name} * ${item.menu_number}`"
                >
                    <template #content>
                        <span 
                            v-for="(flavor, fIndex) in item.menu_flavors" 
                            :key="fIndex"
                        >
                            {{ flavor.flavor }}
                        </span>
                    </template>
                </ShowLayout>
                <template #footer />
            </wd-card>

            <wd-card>
                <template #title>
                    <view class="title">优惠券</view>
                </template>
                <view v-if="orderInfo.discount">
                    {{ orderInfo.discount.discount_name }}
                </view>
                <view v-else>
                    暂无
                </view>
                <template #footer />
            </wd-card>

            <wd-card>
                <template #title>
                    <view class="title">订单金额</view>
                </template>
                <view class="price-cell">
                    <wd-text text="原价" />
                    <wd-text v-if="!orderInfo.discount" :text="orderInfo.order_price.toFixed(1)" />
                    <wd-text v-else :text="orderInfo.order_price + orderInfo.discount.subtract" />
                </view>
                <view v-if="orderInfo.discount" class="price-cell">
                    <wd-text text="优惠券" type="error"/>
                    <wd-text :text="-`${orderInfo.discount.subtract}`" type="error" />
                </view>
                <wd-divider />
                <view class="price-cell">
                    <wd-text text="合计" size="32rpx" color="#333" />
                    <wd-text :text="orderInfo.order_price.toFixed(1)" size="32rpx" color="#333" />
                </view>
                
                <template #footer />
            </wd-card>
        </view>
        <wd-status-tip 
            v-else
            image="content"
            tip="暂无订单信息"
        />
    </view>

</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ShowLayout from '@/components/ShowLayout.vue';
import { ref } from 'vue'
import { BASE_URL, BASE_SERVER_URL, getOrderInfo, finishOrder } from '@/api/index'
import { useToast } from 'wot-design-uni';

const toast = useToast()

const orderInfo = ref<Order>()
const documentId = ref<string>('')
const orderMode = ref<OrderMode>()
const isPicked = ref<boolean>(false)
const orderStatus = ref<OrderStatus>()

// 位置信息
const latitude = ref(39.909)
const longitude = ref(116.39742)
const covers = ref([{
	latitude: 39.909,
	longitude: 116.39742,
	iconPath: '../../../static/location.png'
}, {
	latitude: 39.90,
	longitude: 116.39,
	iconPath: '../../../static/location.png'
}])

onLoad(async (e: any) => {
    documentId.value = e.documentId

    const orderRes = await getOrderInfo(documentId.value, [
        { 'populate': '*' }
    ])
    orderInfo.value = orderRes.data
    orderMode.value = orderRes.data.order_mode
    orderStatus.value = orderRes.data.order_status
    isPicked.value = orderRes.data.order_status === 'finished'

    if (orderMode.value === 'outside') {
        uni.getLocation({
            success: (res) => {
                console.log(res);
                latitude.value = res.latitude
                longitude.value = res.longitude
            },
            fail: (fail) => {
                toast.error('用户拒绝获取位置信息')
            }
        })

        setTimeout(() => {
            finishOrder(documentId.value).then(res => {
                if (res.code === 0) {
                    toast.success('订单已完成')
                    orderStatus.value = 'finished'
                } else {
                    toast.error(res.message!)
                }
            })
        }, 10 * 1000)
    }
})

const qrCodeImg = ref<string>('')
let timer: NodeJS.Timer

/**
 * 非外送订单轮询订单信息
 */
onShow(() => {
    if (orderMode.value !== 'outside') {
        timer = setInterval(() => {
            getOrderInfo(documentId.value, [
                { 'fields': 'order_status' },
            ]).then(res => {
                // orderInfo.value = res.data
                orderStatus.value = res.data.order_status
                isPicked.value = res.data.order_status === 'finished'
            })
        }, 2 * 1000)
    }
})

const onQrCodeSuccess = (img) => {
    qrCodeImg.value = img
}

onUnload(() => {
    if (timer) clearInterval(timer)
})

</script>

<style lang="scss" scoped>

.map {
    position: fixed;
    z-index: 0;
    width: 100%;
    height: 300px;
}

.pick-up_qrcode {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 32rpx;
    margin-bottom: 32rpx;
}

.order-info {
    position: relative;
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 32rpx;
    border-top-right-radius: 32rpx;
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.3);
}

.margin-top-300 {
    margin-top: 300px;
}

.price-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

</style>