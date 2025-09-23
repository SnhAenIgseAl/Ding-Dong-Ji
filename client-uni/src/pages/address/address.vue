<template>
    <Navbar title="我的收获地址" />

    <wd-fab 
        position="right-bottom"
        :expandable="false"
        :zIndex="9"
        @click="add"
    />

    <wd-action-sheet 
        v-model="showAddressForm" 
        title="详细地址"
        close-on-click-modal
    >
        <view style="padding: 32rpx;">
            <wd-form ref="form" :model="addressInfo">
            <wd-cell-group border>
                <wd-input
                    label="详细地址"
                    label-width="100px"
                    prop="address_detail"
                    clearable
                    v-model="addressInfo.address_detail"
                    placeholder="请输入详细地址"
                    :rules="[{ required: true, message: '请填写详细地址' }]"
                />
                <wd-input
                    label="联系电话"
                    label-width="100px"
                    prop="phone"
                    clearable
                    :maxlength="11"
                    v-model="addressInfo.phone"
                    placeholder="请输入联系电话"
                    :rules="[{ required: true, message: '请填写联系电话' }]"
                />
            </wd-cell-group>
            <view class="footer">
                <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
            </view>
            </wd-form>
        </view>
    </wd-action-sheet>

    <view class="sub-page">

        <wd-card 
            v-if="addressList"
            v-for="item in addressList"
            :key="item.documentId"
            :title="item.address_detail"
        >
            <template #footer>
                <view>
                    <wd-button 
                        size="small" 
                        plain
                        @click="setAddress(item)"
                    >
                        设为默认地址
                    </wd-button>
                    <wd-button 
                        size="small" 
                        plain
                        @click="update(item)"
                    >
                        编辑
                    </wd-button>
                    <wd-button 
                        size="small" 
                        plain 
                        type="error"
                        @click="del(item.documentId)"
                    >
                        删除
                    </wd-button>
                </view>
            </template>
        </wd-card>
    </view>
    <wd-toast />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getAddressList, addAddress, updateAddress, deleteAddress } from '@/api/index'
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const {
    userAddress
} = storeToRefs(useUserStore())

const toast = useToast()
const addressList = ref<Address[]>([])
const showAddressForm = ref<boolean>(false)
const showAddressMethod = ref<'add' | 'update'>('add')

const addressInfo = ref({
    address_detail: '',
    phone: '',
    id: ''
})

getAddressList().then((res) => {
    addressList.value = res.data
})

const setAddress = (item: Address) => {
    userAddress.value = item
    toast.success('设置成功')
}

const handleSubmit = () => {
    if (showAddressMethod.value === 'add') {
        addAddress(addressInfo.value).then(res => {
            if (res.data) {
                addressList.value.push(res.data)
                toast.success('添加成功')
            } else {
                toast.error(res.error.message)
            }
        })
    }
    if (showAddressMethod.value === 'update') {
        updateAddress(addressInfo.value).then(res => {
            if (res.data) {
                addressList.value.forEach((item) => {
                    if (item.documentId === addressInfo.value.id) {
                        item.address_detail = addressInfo.value.address_detail
                        item.phone = addressInfo.value.phone
                    }
                })
                toast.success('更新成功')
            } else {
                toast.error(res.error.message)
            }
        })
    }
    showAddressForm.value = false
}

const add = () => {
    showAddressForm.value = true
    showAddressMethod.value = 'add'

    addressInfo.value = {
        address_detail: '',
        phone: '',
        id: ''
    }
}

const update = (item: Address) => {
    showAddressForm.value = true
    showAddressMethod.value = 'update'

    addressInfo.value = {
        address_detail: item.address_detail,
        phone: item.phone,
        id: item.documentId
    }
}

const del = (id: string) => {
    deleteAddress(id).then(res => {
        if (res.code === 0) {
            toast.success(res.message!)
            addressList.value = addressList.value.filter((item) =>
                item.documentId !== id
            )
        } else {
            toast.error(res.message!)
        }
    })
}

</script>

<style scoped lang="scss">
</style>