<template>
    <div class="store-bind">
        <t-card title="绑定已有分店" header-bordered>
            <t-select v-model="storeId" placeholder="请选择分店">
                <t-option 
                    v-for="store in storeList"
                    :key="store.documentId" 
                    :label="store.store_name" 
                    :value="store.documentId" 
                />
            </t-select>
            <t-button :disabled="!storeId" @click="bind">确定</t-button>
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { getStoreList, bindStore } from '@/api/index'
import { MessagePlugin } from 'tdesign-vue-next';
import { useUserStore } from '@/stores/index';

const router = useRouter()

const userStore = useUserStore()

const storeList = ref<Store[]>([])

getStoreList().then(res => {
    storeList.value = res.data
})

const storeId = ref<string>('')

const bind = () => {
    bindStore(storeId.value).then(async res => {
        if (res.code === 0) {
            MessagePlugin.success(res.message)
            await userStore.setUserInfoAsync()
            router.push('/total')
        } else {
            MessagePlugin.error(res.message)
        }
    })
}

</script>

<style scoped>

.store-bind {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>