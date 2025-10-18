<template>
    <Navbar title="确认订单" />

    <wd-toast />

    <view class="sub-page" style="padding-top: 32rpx;">

        <wd-card v-if="orderMode !== 'outside'">
            <template #title>
                <view class="title">就餐方式</view>
            </template>
            <view class="order-mode">
                <view 
                    class="order-mode__button"
                    :class="{'choose-border': orderMode === 'dine_in'}"
                    @click="orderMode = 'dine_in'"
                >
                    堂食
                </view>
                <view 
                    class="order-mode__button"
                    :class="{'choose-border': orderMode === 'takeout'}"
                    @click="orderMode = 'takeout'"
                >
                    外带
                </view>
            </view>
            <template #footer />
        </wd-card>

        <wd-card v-else>
            <template #title>
                <view class="title">收货地址</view>
            </template>
            <wd-button v-if="!userAddress" plain @click="goTo('/pages/address/address')">选择</wd-button>
            <view v-else>
                <ShowLayout 
                    :title="userAddress.address_detail" 
                    :content="userAddress.phone"
                />
            </view>
            <template #footer />
        </wd-card>

        <wd-card>
            <template #title>
                <view class="title">订单信息</view>
            </template>
            <ShowLayout 
                v-for="item in orderList"
                :key="item.documentId"
                :title="`${item.menu_name} * ${item.menu_number}`"
                :img="item.menu_img.url"
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

            <template #footer>
                <wd-button size="small" plain @click="back">修改</wd-button>
            </template> 
        </wd-card>

        <wd-card>
            <template #title>
                <view class="title">优惠券</view>
            </template>
            <view v-if="discountInfo">
                {{ discountInfo.discount_name }}
            </view>
            <view v-else>
                暂无
            </view>
            
            <template #footer>
                <wd-button size="small" plain @click="goTo('/pages/discount/discount?from=order')">修改</wd-button>
            </template> 
        </wd-card>

        <wd-card>
            <template #title>
                <view class="title">订单金额</view>
            </template>
            <view class="price-cell">
                <wd-text text="原价" />
                <wd-text :text="oriPrice" />
            </view>
            <view v-if="discountInfo" class="price-cell">
                <wd-text text="优惠券" type="error"/>
                <wd-text :text="-`${discountInfo.subtract}`" type="error" />
            </view>
            <wd-divider />
            <view class="price-cell">
                <wd-text text="合计" size="32rpx" color="#333" />
                <wd-text :text="totalPrice.toFixed(1)" size="32rpx" color="#333" />
            </view>
            
            <template #footer>
                <wd-button 
                    type="primary"  
                    :loading="submitButtonLoading"
                    @click="submit" 
                >
                    提交订单
                </wd-button>
            </template>
        </wd-card>
    </view>

</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import { useUserStore, useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia';
import { submitOrder, BASE_SERVER_URL } from '@/api/index'
import { useToast } from 'wot-design-uni'
import ShowLayout from '@/components/ShowLayout.vue'
import { goTo, countPrice, back } from '@/utils/common'

const toast = useToast()

const {
    userState,
    userAddress
} = storeToRefs(useUserStore())
const {
    storeInfo,
    orderMode,
    orderList,
    discountInfo
} = storeToRefs(useShoppingStore())

const oriPrice = ref<number>(countPrice(orderList.value))
console.log(oriPrice.value)
const totalPrice = computed(() => {
    // price.value = countPrice(orderList.value)
    if (discountInfo.value) {
        return oriPrice.value - discountInfo.value.subtract
    } else {
        return oriPrice.value
    }
})

// 提交订单
const submitButtonLoading = ref<boolean>(false)
const submit = async () => {
    submitButtonLoading.value = true
    submitOrder({
        store: storeInfo.value!.documentId,
        order_mode: orderMode.value,
        user: userState.value!.documentId,
        order_list: orderList.value,
        order_status: 'production',
        discount: discountInfo.value?.documentId,
        address: userAddress.value?.documentId
    }).then(res => {
        if (res.code === 0) {
            toast.success('下单成功')
            orderList.value = {}
            discountInfo.value = null
            oriPrice.value = 0

            setTimeout(() => {
                uni.redirectTo({
                    url: `/pages/order/detail?documentId=${res.data.documentId}&mode=${orderMode.value}`,
                })
            }, 300)
        } else {
            toast.error(res.message!)
        }
    })

    submitButtonLoading.value = false
}

</script>

<style lang="scss" scoped>

.price-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.order-mode {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    gap: 32rpx;
}

.order-mode__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 90rpx;
    color: #333;
    font-weight: bold;
    border-radius: 1000rpx;
    border: 2px solid #ccc;
    background-color: #fff;
}

.choose-border {
    border: 2px solid orange;
}

.order-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

.order-info__menu {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: flex-start;
}
.order-info__menu-info {
    color: #000;
    font-size: 24rpx;
    margin-bottom: 24rpx;
}

</style>