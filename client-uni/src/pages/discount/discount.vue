<template>
    <Navbar title="优惠券" />
    <wd-tabs 
        v-model="tab" 
        sticky
        @click="headleClick"
    >
        <block v-for="item in tabList" :key="item.title">
            <wd-tab :title="item.title" :name="item.type">
                <view class="content">
                    <wd-card v-if="from === 'order'" title="不使用优惠券">
                        <template #footer>
                            <wd-button 
                                size="small" 
                                plain 
                                @click="notUse"
                            >
                                确定
                            </wd-button>
                        </template>
                    </wd-card>
                    <wd-card 
                        v-show="discountList.length"
                        v-for="discount in discountList"
                        :key="discount.documentId"
                        :title="discount.discount_name"
                    >
                        <template #footer>
                            <wd-button 
                                size="small" 
                                plain 
                                @click="using(discount)"
                                :disabled="totalPrice < discount.reach"
                            >
                                使用
                            </wd-button>
                        </template>
                    </wd-card>
                    <wd-status-tip 
                        v-if="!discountList.length"
                        image="content" 
                        tip="暂无优惠券" 
                    />
                </view>
            </wd-tab>
        </block>
    </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import Navbar from '@/components/Navbar.vue';
import { onLoad } from '@dcloudio/uni-app'
import { getDiscountList } from '@/api/index'
import { back, countPrice } from '@/utils/common';

const {
    orderList,
    discountInfo
} = storeToRefs(useShoppingStore())

const from = ref<string>('')
onLoad((e: any) => {
    from.value = e.from
})

const tab = ref<number>(0)
const totalPrice = ref<number>(countPrice(orderList.value))
const discountList = ref<Discount[]>([])

const headleClick = (e: any) => {
    const is_uesd = e.name === 'canUse' ? 'false' : 'true'

    getDiscountList([
        { 'filters[is_used][$eq]': is_uesd },
        { 'sort[0]': 'createdAt:desc' }
    ]).then(res => {
        discountList.value = res.data
    })
}

getDiscountList([
    { 'filters[is_used][$eq]': 'false' },
    { 'sort[0]': 'createdAt:desc' }
]).then(res => {
    discountList.value = res.data
})

const tabList = [
    {
        title: '可使用',
        type: 'canUse'
    },
    {
        title: '已使用',
        type: 'used'
    },
    {
        title: '已过期',
        type: 'expired'
    }
]

const notUse = () => {
    discountInfo.value = null
    back()
}

const using = (item: Discount) => {
    if (from.value === 'order') {
        discountInfo.value = item
        back()
    }
    if (from.value === 'user'){
        uni.navigateTo({
            url: '/pages/menu/menu'
        })
    }
}
</script>

<style scoped>
.content {
    padding: 32rpx 0;
    box-sizing: border-box;
}
</style>