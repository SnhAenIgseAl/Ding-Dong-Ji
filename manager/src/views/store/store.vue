<template>

    <div class="page">
        <t-card title="分店信息" header-bordered>
            <t-loading :loading="isLoading" show-overlay>
                <t-descriptions v-if="storeInfo">
                    <t-descriptions-item label="分店名称">
                        {{ storeInfo.store_name }}
                    </t-descriptions-item>
                    <t-descriptions-item label="分店地址">
                        {{ storeInfo.store_address }}
                    </t-descriptions-item>
                    <t-descriptions-item label="营业时间">
                        {{ storeInfo.store_opening }} — {{ storeInfo.store_closing }}
                    </t-descriptions-item>
                </t-descriptions>
            </t-loading>
        </t-card>
        
        <t-card title="更新分店信息" header-bordered>
            <Form 
                @submit="update"
            />
        </t-card>
    </div>

</template>

<script setup lang="ts">
import { getStoreInfo, updateStoreInfo } from '@/api/index'
import Form from './components/form.vue';
import { MessagePlugin } from 'tdesign-vue-next';

const storeInfo = ref<Store>()
const isLoading = ref<boolean>(true)

getStoreInfo().then(res => {
    isLoading.value = false
    storeInfo.value = res.data
})

const update = (data) => {
    updateStoreInfo(data).then(res => {
        if (res.code === 0) {
            MessagePlugin.success('更新成功')
        } else {
            MessagePlugin.error(res.message)
        }
    })
}

</script>

<style scoped>

</style>