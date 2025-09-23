<template>
    <view class="store-info">
        <ShowLayout
            v-if="storeInfo"
            :content="storeInfo.store_address"
        >
            <template #title>
                当前餐厅：{{ storeInfo.store_name }}
            </template>
            <template #suffix>
                <wd-button type="icon" icon="translate-bold" @click="showStoreList = true"></wd-button>
            </template>
        </ShowLayout>
        <ShowLayout 
            v-else
            title="尚未选择餐厅"
        >
            <wd-button type="icon" icon="translate-bold" @click="showStoreList = true"></wd-button>
        </ShowLayout>
    </view>
    <wd-action-sheet 
        v-model="showStoreList" 
        title="选择一家餐厅" 
    >
        <view>
            <wd-radio-group 
                v-model="choose" 
                cell
            >
                <wd-radio 
                    v-for="(storeItem, storeIndex) in storeList"
                    :key="storeIndex"
                    :value="storeIndex"
                    :disabled="!storeItem.is_operation"
                >
                    {{ storeItem.store_name }} {{ storeItem.store_address }} · 
                    <span v-if="storeItem.is_operation">营业中</span>
                    <span v-else>已打烊</span>
                </wd-radio>
            </wd-radio-group>
        </view>
        <wd-button 
            type="primary" 
            @click="confirm"
            block
        >
            确定
        </wd-button>
    </wd-action-sheet>
</template>

<script setup lang="ts">
import ShowLayout from './ShowLayout.vue';
import { useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { getStoreList } from '@/api/index'

const {
    storeInfo,
    showStoreList,
    orderList
} = storeToRefs(useShoppingStore())

const storeList = ref<Store[]>([])
const choose = ref(0)

getStoreList().then(res => {
    storeList.value = res.data
    orderList.value = {}
})

watch(showStoreList, (newVal, oldVal) => {
    if (newVal) {
        getStoreList().then(res => {
            storeList.value = res.data
            orderList.value = {}
        })
    }
})

const confirm = () => {
    // show.value = false
    showStoreList.value = false
    storeInfo.value = storeList.value[choose.value]
    orderList.value = {}
}

</script>

<style scoped>
.store-info {
    padding: 32rpx;
    box-sizing: border-box;
}
</style>