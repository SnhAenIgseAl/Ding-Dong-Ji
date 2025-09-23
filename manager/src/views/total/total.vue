<template>
    <div class="page">
        <t-typography-title level="h1">
            欢迎回来，<br />{{ userStore.userState?.username }}
        </t-typography-title>
        <t-row :gutter="16">
            <t-col :span="3">
                <div class="total-card total-hover border-round">
                    <t-statistic title="总营业额" :value="recentOrderPrice" unit="元" trend-placement="right" prefix="￥" />
                </div>
            </t-col>
            <t-col :span="3">
                <div class="total-card border-round">
                    <t-statistic title="总订单量" :value="recentOrderNum" unit="单" trend-placement="right">
                        <template #prefix>
                            <t-icon name="control-platform" />
                        </template>
                    </t-statistic>
                </div>
            </t-col>
            <t-col :span="3">
                <div class="total-card border-round">
                    <t-statistic title="今日营业额" :value="todayOrderPrice" unit="元" trend="increase" trend-placement="right" prefix="￥" />
                </div>
            </t-col>
            <t-col :span="3">
                <div class="total-card border-round">
                    <t-statistic title="今日订单量" :value="todayOrderNum" unit="单" trend="increase" trend-placement="right">
                        <template #prefix>
                            <t-icon name="control-platform" />
                        </template>
                    </t-statistic>
                </div>
            </t-col>
        </t-row>
        <t-row :gutter="[16, 16]">
            <t-col :span="6">
                <EchartsLine 
                    v-if="!orderLoading"
                    id="#order-total-num"
                    title="最近每日订单量"
                    :x-axis-data="perDate"
                    :series="[
                        {
                            name: '订单量',
                            type: 'line',
                            symbol: 'none',
                            sampling: 'lttb',
                            data: perNum
                        }
                    ]"
                />
            </t-col>
            <t-col :span="6">
                <EchartsLine 
                    v-if="!orderLoading"
                    id="#order-total-price"
                    title="最近每日销售额"
                    :x-axis-data="perDate"
                    :series="[
                        {
                            name: '销售额',
                            type: 'line',
                            symbol: 'none',
                            data: perPrice
                        }
                    ]"
                />
            </t-col>
            <t-col :span="6">
                <div class="border-round">
                    <t-table 
                        hover 
                        size="large" 
                        tableLayout="auto" 
                        row-key="index" 
                        lazy-load
                        :data="orderList" 
                        :loading="orderLoading"
                        :columns="orderColumns" 
                        :max-height="322"
                    >
                        <template #order_mode="{ row }">
                            <span v-if="row.order_mode === 'outside'">外卖</span>
                            <span v-if="row.order_mode === 'takeout'">外带</span>
                            <span v-if="row.order_mode === 'dine_in'">堂食</span>
                        </template>
                        <template #order_list="{ row }">
                            <t-row>
                                <t-col 
                                    v-for="menu in row.order_list" 
                                    :key="menu.documentId"
                                    :span="12"
                                >
                                    {{ menu.menu_name }} x {{ menu.menu_number }}
                                    <span 
                                        v-if="menu.menu_flavors"
                                        v-for="flavor in menu.menu_flavors"
                                    >
                                        · {{ flavor.flavor }}
                                    </span>
                                </t-col>
                            </t-row>
                        </template>
                        <template #order_status="{ row }">
                            <t-tag v-if="row.order_status === 'production'" theme="warning" variant="light">
                                制作中
                            </t-tag>
                            <t-tag v-if="row.order_status === 'delivering'" theme="warning" variant="light">
                                配送中
                            </t-tag>
                            <t-tag v-if="row.order_status === 'pick_up'" theme="success" variant="light">
                                可取餐
                            </t-tag>
                            <t-tag v-if="row.order_status === 'finished'" theme="success" variant="light">
                                已完成
                            </t-tag>
                            <t-tag v-if="row.order_status === 'canceled'" theme="danger" variant="light">success" variant="light">
                                已取消
                            </t-tag>
                        </template>
                    </t-table>
                </div>
            </t-col>
            <t-col :span="3">
                <EchartsPie
                    v-if="!orderLoading"
                    id="#order-per-price"
                    title="销售额区间统计"
                    :data="perPriceRange"
                />
            </t-col>
            <t-col :span="3">
                <EchartsPie
                    v-if="!orderLoading"
                    id="#order-total-mode"
                    title="就餐方式统计"
                    :data="perMode"
                />
            </t-col>
        </t-row>
    </div>
</template>

<script setup lang="ts">
import { TableProps } from 'tdesign-vue-next'
import { useUserStore } from '@/stores';
import { getOrderTotalToday, getOrderTotalRecent, getOrderLists } from '@/api'
import EchartsLine from '@/components/echarts/EchartsLine.vue'
import EchartsPie from '@/components/echarts/EchartsPie.vue'
import { groupBy } from '@/utils/common';

const userStore = useUserStore()

const orderLoading = ref<boolean>(true)

const recentOrder = ref({})
const recentOrderNum = ref(0)
const recentOrderPrice = ref(0)

const todayOrder = ref({})
const todayOrderNum = ref(0)
const todayOrderPrice = ref(0)

const perDate = ref<string[]>([])
const perNum = ref<number[]>([])
const perPrice = ref<number[]>([])
const perPriceRange = ref([])
const perMode = ref([])

const orderList = ref<Order[]>([])
const orderColumns: TableProps['columns'] = [
    { colKey: 'order_id', title: '订单编号', width: 120, fixed: 'left'},
    { colKey: 'order_mode', title: '就餐方式', width: 120 },
    { colKey: 'order_status', title: '订单状态', width: 120 },
    { colKey: 'order_list', title: '概览'}
]

onMounted(async () => {

    // 统计今日订单数据
    const todayData = await getOrderTotalToday()
    todayOrder.value = todayData.data.data
    todayOrderNum.value = todayData.data.count
    todayOrderPrice.value = todayData.data.price

    // 统计最近一个月订单数据
    const recentData = await getOrderTotalRecent()
    recentOrder.value = recentData.data.data
    recentOrderNum.value = recentData.data.count
    recentOrderPrice.value = recentData.data.price
    
    // 统计每日订单量及价格
    for (let key in recentOrder.value) {
        perDate.value.push(key)
        perNum.value.push(recentOrder.value[key].length)
        let price = 0
        recentOrder.value[key].map(item => {
            price += item.order_price
        })
        perPrice.value.push(parseFloat(price.toFixed(2)))
    }

    // 按每个订单总价区间分组
    const orderGroupByPrice = groupBy(recentData.data.origin, (item) => {
        if (item.order_price >= 0 && item.order_price < 30) {
            return '0~30'
        } else if (item.order_price >= 30 && item.order_price < 100) {
            return '30~100'
        } else {
            return '100+'
        }
    })

    // 统计每个订单总价区间订单量
    for (let key in orderGroupByPrice) {
        perPriceRange.value.push({
            value: orderGroupByPrice[key].length,
            name: key
        })
    }

    // 按就餐方式分组
    const orderGroupByMode = groupBy(recentData.data.origin, 'order_mode')

    // 统计每个就餐方式订单量
    for (let key in orderGroupByMode) {
        perMode.value.push({
            value: orderGroupByMode[key].length,
            name: key
        })
    }

    // 获取最新订单列表
    const orderRes = await getOrderLists([{
        'sort': 'createdAt:desc',
        'populate': 'store',
        'pagination[page]': '1',
        'pagination[pageSize]': '10'
    }])

    orderList.value = orderRes.data
    
    orderLoading.value = false
})
</script>

<style scoped>
.total-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    background-color: #fff;
    padding: 16px;
    transition: all 0.3s;
    &:deep(.t-statistic-content) {
        color: var(--td-brand-color);
    }

    &:hover {
        background-color: var(--td-brand-color);
        cursor: pointer;

        &:deep(.t-statistic-title) {
            color: #fff;
        }
        &:deep(.t-statistic-content) {
            color: #fff;
        }
    }
}

.total-hover  {
    background-color: var(--td-brand-color);
    cursor: pointer;

    &:deep(.t-statistic-content) {
        color: #fff;
    }
    &:deep(.t-statistic-title) {
        color: #fff;
    }
}

#order-total-num {
    width: 100%;
    height: 400px;
    background-color: #fff;
}
</style>