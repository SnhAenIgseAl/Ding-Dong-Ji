<template>
    <wd-action-sheet 
        v-model="show" 
        title="购物车" 
    >
        <view>
            <view v-for="(item, index) in cartList" :key="index">
                {{ item.mneu_name }}
            </view>
        </view>
        <wd-button 
            type="primary" 
            @click="show = false"
            block
        >
            确定
        </wd-button>
    </wd-action-sheet>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useShoppingStore } from '../stores/shopping'

const show = defineModel({
    type: Boolean,
    default: false
})

const {
    cartList
} = storeToRefs(useShoppingStore())



</script>

<style scoped>
</style>