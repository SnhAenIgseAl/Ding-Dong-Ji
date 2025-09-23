<template>
    <view :class="[
        mode === 'default' ? 
        'layout-default' :
        'layout-card'
    ]">
        <view :class="[
            mode === 'default' ? 
            'layout-default__img' :
            'layout-card__img'
        ]">
            <wd-img 
                v-if="img"
                :src="img" 
                width="100%"
                height="100%"
                radius="16rpx"
                mode="aspectFill"
            />
        </view>

        <view class="layout-body">
            <view class="layout-info">
                <view class="layout-title">
                    <slot name="title">
                        {{ title }}
                    </slot>
                </view>
                <view class="layout-content">
                    <slot name="content">
                        {{ content }}
                    </slot>
                </view>
            </view>

            <view class="layout-suffix">
                <slot name="suffix"></slot>
            </view>
        </view>
        
    </view>
</template>

<script setup lang="ts">
type ShowLayoutMode = 'default' | 'card'

const {
    mode,
    img,
    title,
    content,
    link,
} = defineProps({
    mode: {
        type: String as () => ShowLayoutMode,
        default: 'default',
    },
    img: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
})

</script>

<style scoped lang="scss">

.layout-default {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 16rpx;
    margin-bottom: 32rpx;
}

.layout-card {
    display: flex;
    flex-flow: column nowrap;
    width: 360rpx;
    height: auto;
    padding: 32rpx;
    gap: 32rpx;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 16rpx;
    margin-bottom: 32rpx;
}

.layout-default__img {
    width: 90rpx;
    height: 90rpx;
}

.layout-card__img {
    width: 296rpx;
    height: 396rpx;
}

.layout-body {
    display: flex;
    gap: 32rpx;
}

.layout-info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
}

.layout-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}

.layout-content {
    font-size: 24rpx;
    color: #999;
    margin-top: 8rpx;
}
</style>