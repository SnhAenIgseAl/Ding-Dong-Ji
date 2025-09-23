<template>
    <div class="page">
        <t-row :gutter="16">
            <t-col :span="3">
                <t-input 
                    v-model="filterText"
                    placeholder="查找订单编号" 
                    clearable
                    size="large"
                >   
                    <template #suffix-icon>
                        <t-icon name="search" />
                    </template>
                </t-input>
            </t-col>
            <t-col :span="3">
                <t-button @click="calendarVisible = true" size="large">切换日期</t-button>
                    <t-drawer 
                        v-model:visible="calendarVisible"
                        attch="#app"
                        lazy
                        @onClose="calendarVisible = false"
                        @onConfirm="calendarVisible = false"
                        size="600px"
                    >
                        <template #header>切换日期</template>
                        <t-calendar 
                            theme="full" 
                            is-show-weekend-default 
                            fill-with-zero 
                            @cell-click="calendarClick"
                        />
                </t-drawer>
            </t-col>
        </t-row>
        <t-table 
            hover 
            size="large" 
            tableLayout="auto" 
            row-key="index" 
            lazy-load
            :data="orderList" 
            :loading="orderLoading"
            :columns="orderColumns" 
            :pagination="orderPage"
            @change="handleChange"
            :max-height="630"
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
            <template #detail="{ row }">
                <t-link theme="primary" @click="$router.push(`/order/${row.documentId}`)">查看详情</t-link>
            </template>
            <template #operation="{ row }">
                <t-link theme="primary" :disabled="row.order_status === 'finished'" @click="operationOrder(row)">变更状态</t-link>
            </template>
        </t-table>
        
    </div>
    <t-dialog
        v-model:visible="operationVisible"
        header="变更订单状态"
        attach="#app"
        destroy-on-close
        placement="center"
        :on-confirm="changeOrderStatus"
    >
        <div slot="body">
            <t-radio-group size="large" default-value="1">
                <t-radio-button v-if="orderMode === 'takeout' || orderMode === 'dine_in'" value="1">可取餐</t-radio-button>
                <t-radio-button v-if="orderMode === 'outside'" value="1">骑手已取餐</t-radio-button>
                <t-radio-button value="2">完成订单</t-radio-button>
            </t-radio-group>
        </div>
    </t-dialog>
</template>

<script setup lang="ts">
import { getOrderLists, setOrderStatus, finishOrder } from '@/api'
import { MessagePlugin, TableProps, CalendarProps } from 'tdesign-vue-next'
import { formatDate } from '@/utils/common'

const orderLoading = ref<boolean>(true)
const orderListOrigin = ref<Order[]>([])
const orderList = ref([])
const orderPage = reactive({
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0
})
const orderColumns: TableProps['columns'] = [
    { colKey: 'order_id', title: '订单编号', width: 120, fixed: 'left'},
    { colKey: 'order_price', title: '订单金额' },
    { colKey: 'order_mode', title: '就餐方式' },
    { colKey: 'order_status', title: '订单状态' },
    { colKey: 'order_list', title: '概览', width: 360},
    { colKey: 'detail', title: '订单详情' },
    { colKey: 'createdAt', title: '下单时间' },
    { colKey: 'operation', title: '操作', fixed: 'right' }
]

/**
 * 初始化评论列表
 */
onMounted(() => {
    initOrderList(orderPage.defaultCurrent, orderPage.defaultPageSize)
})

const initOrderList = async (
    page: number,
    pageSize: number,
) => {
    const orderRes = await getOrderLists([{
        'sort': 'createdAt:desc',
        'populate': 'store',
        'pagination[page]': page + '',
        'pagination[pageSize]': pageSize + ''
    }, {
        'filters[createdAt][$gte]': new Date(dateStart.value).toISOString(),
    }, {
        'filters[createdAt][$lte]': new Date(dateEnd.value).toISOString()
    }])
    orderListOrigin.value = orderRes.data
    orderPage.total = orderRes.meta.pagination.total
    orderLoading.value = false

    orderList.value = orderRes.data
    orderList.value.map(item => {
        item.createdAt = formatDate(item.createdAt)
    })
}



/**
 * 搜索订单
 */
const filterText = ref('')
watch(filterText, (newVal) => {
    orderList.value = orderListOrigin.value.filter(item =>
        item.order_id.includes(newVal)
    )
})



/**
 * 切换日期
 */
const calendarVisible = ref<boolean>(false)
const date = ref(new Date())
const dateStart = ref(date.value.setHours(0, 0, 0, 0))
const dateEnd = ref(date.value.setHours(23, 59, 59, 999))

const calendarClick: CalendarProps['onCellClick'] = (option) => {
    console.log(option);
    date.value = option.cell.date
    dateStart.value = option.cell.date.setHours(0, 0, 0, 0)
    dateEnd.value = option.cell.date.setHours(23, 59, 59, 999)
    // console.log(
    //     new Date(dateStart.value).toISOString(),
    //     new Date(dateEnd.value).toISOString()
    // );
    
    initOrderList(orderPage.defaultCurrent, orderPage.defaultPageSize)
}
 



/**
 * 切换分页
 */
const handleChange: TableProps['onChange'] = (pagination) => {
    const { current, pageSize } = pagination.pagination
    initOrderList(current, pageSize)
}



/**
 * 变更订单状态
 */
const operationVisible = ref<boolean>(false)
const orderMode = ref<OrderMode>()
const orderId = ref<string>()
const orderStatus = ref<OrderStatus>()

const operationOrder = (row: Order) => {
    operationVisible.value = true
    orderMode.value = row.order_mode
    orderId.value = row.documentId
    orderStatus.value = row.order_status
}

const changeOrderStatus = async () => {
    if (orderStatus.value === 'pick_up') {
        const res = await finishOrder(orderId.value)
        if (res.code === 0) {
            MessagePlugin.success('订单完成')
            initOrderList(orderPage.defaultCurrent, orderPage.defaultPageSize)
        } else {
            MessagePlugin.error(res.message)
        }
        operationVisible.value = false
        return
    }

    const statusRes = await setOrderStatus(orderId.value, orderMode.value)

    if (statusRes.code === 0) {
        MessagePlugin.success('订单状态变更成功')
        initOrderList(orderPage.defaultCurrent, orderPage.defaultPageSize)
    } else {
        MessagePlugin.error(statusRes.message)
    }
    operationVisible.value = false
}

</script>

<style scoped></style>