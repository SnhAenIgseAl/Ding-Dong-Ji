import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useShoppingStore = defineStore('shopping', () => {

    // 当前购买方式
    const orderMode = ref<OrderMode>('outside')

    // 当前选择的餐厅信息
    const storeInfo = ref<Store | null>(null)

    // 显示选择餐厅列表
    const showStoreList = ref<boolean>(true)

    // 当前订单信息
    const orderList = ref<OrderList>({})

    // 当前优惠券信息
    const discountInfo = ref<Discount | null>(null)

    // 当前支付状态
    const payState = ref<boolean>(false)

    return {
        orderMode,
        storeInfo,
        showStoreList,
        orderList,
        discountInfo,
        payState
    }
}, {
    persist: true
})