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
            <template #suffix>
                <wd-button type="icon" icon="translate-bold" @click="showStoreList = true"></wd-button>
            </template>
        </ShowLayout>
    </view>
    <wd-action-sheet 
        v-model="showStoreList" 
        title="选择一家餐厅" 
    >
        <view class="store-list">
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
                    <span v-if="storeItem.is_operation">营业中</span>
                    <span v-else>已打烊</span> | 
                    {{ storeItem.store_name }} | 
                    {{ getDistance(latitude, longitude, storeItem.latitude, storeItem.longitude) }}m
                </wd-radio>
            </wd-radio-group>

            <wd-button 
                type="primary" 
                @click="confirm"
                block
            >
                确定
            </wd-button>
        </view>
        
    </wd-action-sheet>
</template>

<script setup lang="ts">
import ShowLayout from './ShowLayout.vue';
import { useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { getStoreList } from '@/api/index'
import { useToast } from 'wot-design-uni'
import { getDistance } from '@/utils/common'

const toast = useToast()

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

const latitude = ref(0)
const longitude = ref(0)

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

.store-list {
    padding: 32rpx;
    height: auto;
    max-height: 960rpx;
    overflow-y: scroll;
    box-sizing: border-box;
}

.store-item {
    max-width: 80%;
    /* padding: 32rpx; */
    /* box-sizing: border-box; */
}
</style>