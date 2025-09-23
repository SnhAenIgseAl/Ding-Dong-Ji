<template>
    <Navbar title="我的订单" />
    <view style="width: 100%;">
        <wd-tabs 
        v-model="tab" 
        sticky
        @click="headleClick"
    >
        <block v-for="item in lists" :key="item.title">
            <wd-tab :title="item.title" :name="item.type">
                <view class="content">
                    <wd-card 
                        v-show="orderLists.length"
                        v-for="item in orderLists"
                        width="100%"
                        :key="item.documentId"
                        :title="`${item.store.store_name} ${item.order_id}`"
                    >
                        <view>
                            <wd-text :text="`创建于${formatDate(item.createdAt)}`" />
                        </view>
                        <template #footer>
                            <wd-button 
                                size="small" 
                                plain 
                                @click="goTo(`/pages/order/detail?documentId=${item.documentId}&mode=${item.order_mode}`)"
                            >
                            查看
                            </wd-button>
                        </template>
                    </wd-card>                    
                    <wd-status-tip 
                        v-if="!orderLists.length"
                        image="content" 
                        tip="暂无订单"
                    />
                </view>
            </wd-tab>
            
        </block>
    </wd-tabs>
    </view>
    
    
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getOrderLists } from '@/api/index'
import { formatDate, goTo } from '@/utils/common';

const tab = ref<number>(0)
const orderLists = ref<Order[]>([])
const orderStatus = ref<'all' | OrderStatus>('all')
const page = ref<number>(1)
const lists = [
    {
        title: '全部',
        type: 'all'
    },
    {
        title: '制作中',
        type: 'production'
    },
    {
        title: '待取餐',
        type: 'pick_up'
    },
    {
        title: '已完成',
        type: 'finished'
    }
]

const headleClick = (e: any) => {
    orderStatus.value = e.name
    initOrderLists(orderStatus.value, page.value)
}

onReachBottom(() => {
    page.value++
    initOrderLists(orderStatus.value, page.value)
})

const initOrderLists = (
    orderStatus: 'all' | OrderStatus,
    page: number
) => {
    getOrderLists([
        orderStatus === 'all' ? {} : { 'filters[order_status]': orderStatus },
        { 'populate': '*', },
        { 'sort[0]': 'createdAt:desc' },
        { 'pagination[page]': page + '' },
        { 'pagination[pageSize]': '25' },
    ]).then((res) => {
        if (page === 1) {
            orderLists.value = res.data
        } else {
            orderLists.value = [...orderLists.value, ...res.data]
        }
    })
}

initOrderLists('all', page.value)

</script>

<style scoped lang="scss">
.content {
    width: 100%;
    padding: 32rpx 0;
    box-sizing: border-box;
}
</style>