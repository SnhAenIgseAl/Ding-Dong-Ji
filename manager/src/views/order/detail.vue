<template>
    <div class="page" >
        <div class="order-detail">
            <t-loading :loading="orderLoading">

                <t-row v-if="orderInfo">
                    <t-col>
                        <t-typography-title level="h1">
                            {{ orderInfo.order_id }}·
                        </t-typography-title>
                    </t-col>
                    <t-col>
                        <t-typography-title level="h1" v-if="orderInfo.order_mode === 'dine_in'">
                            堂食
                        </t-typography-title>
                        <t-typography-title level="h1" v-if="orderInfo.order_mode === 'takeout'">
                            外带
                        </t-typography-title>
                        <t-typography-title level="h1" v-if="orderInfo.order_mode === 'outside'">
                            外卖
                        </t-typography-title>
                    </t-col>
                </t-row>
                <t-divider />
                
                <t-typography-title level="h3">订单明细</t-typography-title>
                <t-row v-if="orderInfo">
                    <t-col 
                        v-for="item in orderInfo.order_list" 
                        :key="item.id"
                        :span="12"
                    >
                        {{ item.menu_name }} x {{ item.menu_number }}
                        <span 
                            v-if="item.menu_flavors"
                            v-for="flavor in item.menu_flavors"
                        >
                            · {{ flavor.flavor }}
                        </span>
                    </t-col>
                    <t-typography-title level="h3">
                        总计：{{ orderInfo.order_price }}元
                    </t-typography-title>
                </t-row>
                <t-divider />

                <t-descriptions v-if="orderInfo">
                    <t-descriptions-item label="创建于">
                        {{ formatDate(orderInfo.createdAt) }}
                    </t-descriptions-item>
                </t-descriptions>
            </t-loading>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { getOrderInfo } from '@/api'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/common'

const route = useRoute()
const { id } = route.params

const orderInfo = ref<Order>()
const orderLoading = ref(true)

onMounted(async () => {
    orderInfo.value = await getOrderInfo(id as string).then(res => res.data)
    orderLoading.value = false
})

</script>

<style scoped>

.order-detail {
    padding: 16px;
    background-color: #fff;
}

</style>