<template>
    <view v-if="detail" class="page">
        <Navbar title="定制"/>

        <wd-img 
            width="100%"
            height="360rpx"
            radius="16rpx"
            mode="aspectFill"
            :src="BASE_SERVER_URL + detail.menu_img.url" 
        />
        <view 
            v-if="detail.menu_flavors"
            v-for="(item, index) in detail.menu_flavors" :key="index"
        >
            <view class="sub-title">{{ item.flavor_name }}</view>

            <wd-radio-group 
                v-if="orderList[detail.menu_name].menu_flavors"
                v-model="orderList[detail.menu_name].menu_flavors[index].flavor" 
                shape="button" 
                cell
                @change="change"
            >
                <wd-radio 
                    v-for="(flavor, fIndex) in orderList[detail.menu_name].menu_flavors[index].flavor_list" 
                    :key="fIndex"
                    :value="flavor"
                >
                    {{ flavor }}
                </wd-radio>
            </wd-radio-group>
        </view>

    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { BASE_SERVER_URL, getMenuDetail } from '@/api/index';
import { onLoad } from '@dcloudio/uni-app'
import { useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

const {
    orderList,
} = storeToRefs(useShoppingStore())

const detail = ref<Menu>()

onLoad((e: any) => {
    // console.log(orderList.value);
    const menuId = e.menuId

    getMenuDetail(menuId, [
        { 'populate': '*' }
    ]).then(res => {
        detail.value = res.data
    })
})

const change = () => {
    // console.log(orderList.value)
}

</script>

<style scoped>

</style>