<template>
    <view class="menu-wraper">
        <wd-sidebar 
            v-model="active" 
            v-if="menuList" 
            @change="handleChange"
        >
            <wd-sidebar-item 
                v-for="(item, index) in menuList" 
                :key="index" 
                :value="index" 
                :label="item.class_name" 
            />
        </wd-sidebar>
        <scroll-view 
            class="content" 
            scroll-y 
            scroll-with-animation 
            :scroll-top="scrollTop" 
            :throttle="false"
            @scroll="onScroll"
        >
            <view 
                v-if="menuList" 
                v-for="(menuClass, index) in menuList" 
                :key="index" 
                class="category"
            >
                <view>
                    <view class="title">
                        {{ menuClass.class_name }}
                    </view>
                    
                    <view
                        v-for="(menu, index) in menuClass.menus" 
                        :key="index"
                    >
                        <view class="menu-info">
                            
                            <!-- 分店有此菜品 -->
                            <view v-if="menu.stores.some((store) => store.documentId === storeInfo?.documentId!)">
                                <wd-img 
                                    :src="menu.menu_img.url" 
                                    mode="aspectFill" 
                                    width="100%" 
                                    height="240rpx" 
                                    radius="12rpx"
                                />
                                <view class="menu-buy">
                                    {{ menu.menu_name }}
                                    <wd-input-number 
                                        v-if="canBuy || !menu.need_vip" 
                                        v-model="menu.menu_number" 
                                        :min="0" 
                                        :max="99"
                                        @change="insertCart({ item: menu })" 
                                    />

                                    <wd-text v-else-if="menu.need_vip" text="狗椒大会员专属" />
                                </view>
                            </view>

                            <!-- 分店没有此菜品 -->
                            <view v-else style="opacity: 0.5;">
                                <wd-img 
                                    :src="menu.menu_img.url" 
                                    mode="aspectFill" 
                                    width="100%" 
                                    height="240rpx" 
                                    radius="12rpx"
                                />
                                <view class="menu-buy">
                                    <wd-text type="error" text="该店已售完"></wd-text>
                                    <wd-input-number
                                        :min="0" 
                                        :max="99" 
                                        disabled 
                                    />
                                </view>
                            </view>
                        </view>
                        
                    </view>
                </view>
            </view>
        </scroll-view>

        <view class="order">
            <wd-button type="icon" icon="cart" @click="showCartList = !showCartList"></wd-button>
            {{ totalPrice.toFixed(1) }}
            <wd-button type="primary" @click="goToSubmit">提交订单</wd-button>
        </view>

        <wd-action-sheet 
            v-model="showCartList" 
            title="购物车"
        >
            <view class="order-list">
                <view 
                    v-if="Object.keys(orderList).length" 
                    v-for="(item, index) in orderList" 
                    :key="index"
                >
                    <ShowLayout 
                        :title="`${item.menu_name} * ${item.menu_number}`"
                        :img="item.menu_img.url"
                    >
                        <template #suffix>
                            <wd-button 
                                v-if="item.menu_flavors.length" 
                                size="small"
                                @click="goTo(`/pages/menu/menuDetail?menuId=${item.documentId}`)"
                            >
                                定制
                            </wd-button>
                        </template>
                    </ShowLayout>
                    <!-- {{ item.menu_name }} * {{ item.menu_number }}
                    <wd-button 
                        v-if="item.menu_flavors.length" 
                        size="small"
                        @click="goTo(`/pages/menu/menuDetail?menuId=${item.documentId}`)"
                    >
                        定制
                    </wd-button> -->
                </view>
                <view 
                    v-else 
                    style="text-align: center; align-content: center;"
                >
                    购物车为空
                </view>
            </view>

        </wd-action-sheet>
    </view>
</template>

<script setup lang="ts">
import { goTo, countPrice } from '@/utils/common'
import { getMenuList, BASE_SERVER_URL } from '@/api/index'
import { useUserStore, useShoppingStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import ShowLayout from '@/components/ShowLayout.vue'

const {
    orderList,
    storeInfo,
    discountInfo,
    orderMode
} = storeToRefs(useShoppingStore())

const userStore = useUserStore()

const menuList = ref<MenuClass[]>([])
const showCartList = ref<boolean>(false)
const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

userStore.setUserInfoAsync()
const canBuy = ref(Object.keys(userStore.userState!.vip).length)

watch(storeInfo, (newVal) => {
    getMenuList([
        { 'populate': 'menus.stores' },
        { 'populate': 'menus.menu_flavors' },
        { 'populate': 'menus.menu_img' },
    ]).then(res => {
        menuList.value = res.data
    })
})

onLoad(() => {
    orderList.value = {}
    discountInfo.value = null

    getMenuList([
        { 'populate': 'menus.stores' },
        { 'populate': 'menus.menu_flavors' },
        { 'populate': 'menus.menu_img' },
    ]).then(res => {
        menuList.value = res.data
    })

    getRect(
        '.category',
        true,
        getCurrentInstance()
    ).then((rects) => {
        if (isArray(rects)) {
            itemScrollTop.value = rects.map((item, index) => {
                if (index === 0) {
                    item.top = 0
                }
                return item.top || 0
            })
            scrollTop.value = rects[active.value].top || 0
            // console.log(itemScrollTop.value, scrollTop.value)
        }
    })
})

const handleChange = ({ value }: { value: number }) => {
    active.value = value
    scrollTop.value = itemScrollTop.value[value]
    console.log(scrollTop.value)
}

const onScroll = (e) => {
    const { scrollTop } = e.detail
    const threshold = 50
    if (scrollTop < threshold) {
        active.value = 0
        return
    }
    const index = itemScrollTop.value.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)
    if (index > -1) {
        active.value = index
    }
}

const oriPrice = ref<number>(countPrice(orderList.value))
const totalPrice = computed(() => {
    return countPrice(orderList.value)
})
// const cartList = ref({})
// 添加到购物车
const insertCart = ({ item }: { item: Menu }) => {
    // totalPrice.value = 0

    if (item.menu_number > 0) {
        orderList.value[item.menu_name] = item
    } else {
        delete orderList.value[item.menu_name]
    }

    // for (let key in orderList.value) {
    //     totalPrice.value += orderList.value[key].menu_price * orderList.value[key].menu_number
    // }

    // orderList.value = cartList.value
    console.log(orderList.value)
}

const goToSubmit = () => {
    if (Object.keys(orderList.value).length === 0) {
        uni.showToast({
            title: '请选择菜品',
            icon: 'none'
        })
    } else if (!userStore.isLogin) {
        goTo('/pages/user/login')
    } else {
        // orderList.value = cartList.value
        console.log(orderList.value)
        goTo(`/pages/menu/submit?mode=${orderMode.value}`)
    }
}

</script>

<style lang="scss" scoped>
.menu-wraper {
    display: flex;
    height: 100vh;
    height: calc(100vh - 124px - var(--window-top));
    height: calc(100vh - 124px - var(--window-top) - constant(safe-area-inset-bottom));
    height: calc(100vh - 124px - var(--window-top) - env(safe-area-inset-bottom));
    border-top: 1px solid #ccc;
}

.content {
    flex: 1;
    background: #fff;
    padding-bottom: 300rpx;
}

.order {
    position: fixed;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 64rpx);
    left: 50%;
    transform: translateX(-50%);
    height: 100rpx;
    padding: 32rpx;
    bottom: 32rpx;
    border-radius: 666rpx;
    box-shadow: 0px 0px 10px #999;
    background-color: #fff;
    box-sizing: border-box;
}

.order-list {
    display: flex;
    flex-flow: column nowrap;
    gap: 16rpx;
    box-sizing: border-box;
    padding: 32rpx;
    height: auto;
    max-height: 960rpx;
    overflow-y: scroll;
}

.order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60rpx;
}

.category {
    // width: 200rpx;
    // height: 100%;
    overflow-y: scroll;
    padding: 32rpx;
    // background-color: #f5f5f5;
    box-sizing: border-box;
}

.menu-info {
    display: flex;
    flex-flow: column nowrap;
    height: 360rpx;
}

.menu-img {
    border: 12rpx;
    overflow: hidden;
}

.menu-buy {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
}
</style>