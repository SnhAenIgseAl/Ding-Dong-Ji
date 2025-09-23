<template>
    <view class="tab-bar">
        <wd-tabbar 
            v-model="tabIndex"
            fixed
            :zIndex="9"
            safeAreaInsetBottom
            placeholder
            activeColor="orange"
            @change="onChange"
        >
            <wd-tabbar-item 
                v-for="(item, index) in tabBarList"
                :key="index"
                :title="item.title" 
                :icon="item.icon"
            >
            </wd-tabbar-item>
        </wd-tabbar>
    </view>
</template>

<script setup lang="ts">
import { useTabStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

const {
    tabIndex
} = storeToRefs(useTabStore())

const tabBarList = [
    {
        icon: 'home',
        title: '首页'
    },
    {
        icon: 'app',
        title: '评论墙'
    },
    {
        icon: 'gift',
        title: '狗椒大会员'
    },
    {
        icon: 'user',
        title: '我的'
    }
]

const onChange = ({ value }: { value: string }) => {
    tabIndex.value = parseInt(value)
}
</script>

<style scoped>
.tab-bar {
    z-index: 9;
}
</style>