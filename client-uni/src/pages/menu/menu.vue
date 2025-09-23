<template>

    <Navbar title="点餐"/>

    <view class="menu-page">
        <ChooseStore />
        <MenuList /> 
    </view>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ChooseStore from '@/components/ChooseStore.vue'
import MenuList from './components/MenuList.vue'

</script>

<style scoped lang="scss">

.menu-page {
    height: calc(100vh - 143px);
    overflow-y: hidden;
}

</style>