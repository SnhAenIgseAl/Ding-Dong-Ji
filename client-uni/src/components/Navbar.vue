<template>
    <wd-navbar 
        :title="title" 
        left-text="返回" 
        left-arrow 
        fixed 
        placeholder 
        safeAreaInsetTop
    >
        <template #capsule>
            <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
        </template>
    </wd-navbar>
</template>

<script setup lang="ts">

const {
    title
} = defineProps({
    title: {
        type: String,
        default: ''
    }
})

const handleBack = () => {
    uni.navigateBack({})
}

const handleBackHome = () => {
    uni.reLaunch({
        url: '/pages/index/index'
    })
}

</script>

<style scoped></style>