<template>
    <div class="store-register">
        <t-card title="注册分店" header-bordered>
            <Form 
                @submit="register"
            />
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import Form from './components/form.vue'
import { createStore } from '@/api';

const router = useRouter()

const route = useRoute()

const register = (data) => {
    const token = route.query.token
    
    createStore(
        data,
        token as string
    ).then(res => {
        if (res.data) {
            MessagePlugin.success('注册分店成功')
            router.push('/total')
        } else {
            MessagePlugin.error(res.error.message)
        }
    })
}

</script>

<style scoped>

.store-register {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>