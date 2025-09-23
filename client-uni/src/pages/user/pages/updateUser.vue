<template>
    <Navbar title="修改信息" />
    <wd-card>
        <template #title>
            <view class="title">修改信息</view>
        </template>
        <wd-cell-group border>
        <wd-input
            label="用户名"
            label-width="100px"
            prop="value1"
            clearable
            v-model="infoForm.username"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        </wd-cell-group>
        <template #footer>
            <wd-button block @click="doUpdate">确定</wd-button>
        </template>
        <wd-toast />
    </wd-card>
    
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { reactive } from 'vue'
import { updateUser } from '@/api/index'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const infoForm = reactive({
    username: '',
})

const doUpdate = async () => {
    updateUser(infoForm).then(() => {
        toast.success('修改成功')
    })
}

</script>

<style scoped>

</style>