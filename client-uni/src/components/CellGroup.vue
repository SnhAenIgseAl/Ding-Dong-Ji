<template>
    <view class="cell-group">
        <view class="title">{{ title }}</view>
        <view class="info-group">
            <wd-cell-group border>
                <wd-cell 
                    v-for="(item, index) in cell" 
                    :key="index" 
                    :title="item.title" 
                    :to="item.to"
                    is-link 
                    @click="item.onClick"
                />
            </wd-cell-group>
        </view>
    </view>
</template>

<script setup lang="ts">

interface CellGroup {
    title: string,
    to?: string,
    onClick?: () => void
}

const {
    title,
    cell,
} = defineProps({
    title: {
        type: String,
        default: ''
    },
    cell: {
        type: Array as () => CellGroup[],
        default: () => []
    }
})
</script>

<style scoped>
.cell-group {
    margin-top: 32rpx;
}

.info-group {
    margin-top: 32rpx;
    padding: 4rpx;
    border-radius: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #eee;
}
</style>

