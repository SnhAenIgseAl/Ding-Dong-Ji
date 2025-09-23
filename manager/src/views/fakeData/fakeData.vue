<template>
    <div class="page">
        <t-card title="生成订单数据" header-bordered>
            <t-input v-model="userToken" placeholder="用户token"></t-input>
            <template #footer>
                <t-button primary @click="createFakeOrder">生成订单（堂食、外带随机 | 10~30条）</t-button>
            </template>
        </t-card>

        <t-card title="生成评论数据" header-bordered>
            <t-input v-model="userToken" placeholder="用户token"></t-input>
            <template #footer>
                <t-button primary @click="createFakeComment">生成评论（5~10条）</t-button>
            </template>
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { submitFakeOrder, submitFakeComment, getOrderLists, getCommentList } from '@/api'
import { MessagePlugin } from 'tdesign-vue-next';

const userId = ref<string>()
const userToken = ref<string>()

const orderList = ref<Order[]>()
const initOrderList = async () => {
    const orderRes = await getOrderLists([{
        'sort': 'createdAt:desc',
        'populate': 'store',
        'pagination[page]': '1',
        'pagination[pageSize]': '50',
    }])

    orderList.value = orderRes.data
}


const createFakeOrder = async () => {
    if (!userId.value || !userToken.value) {
        MessagePlugin.error('请输入用户id和token')
        return
    }
    await initOrderList()
    const randomNum = Math.floor(Math.random() * 10) + 20
    const randomOrderMode = () => {
        if (Math.floor(Math.random() * 10) > 5) { 
            return 'dine_in'
        } else {
            return 'takeout'
        }
    }
    let num = 0

    const doFakeOrder = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * orderList.value.length)
        submitFakeOrder({
            store: orderList.value[randomIndex].store.documentId,
            order_mode: randomOrderMode(),
            userToken: userToken.value,
            order_list: orderList.value[randomIndex].order_list,
        }).then(res => {
            if (res.code === 0) {
                MessagePlugin.success(`第${num}条数据发布成功`)
            } else {
                MessagePlugin.error(`第${num}条数据发布失败`)
            }
        })

        num++

        if (num === randomNum) {
            clearInterval(doFakeOrder)
        }
    }, 100)
}

const commentList = ref<Comment[]>()
const initCommentList = async () => {
    const commentRes = await getCommentList([{
        'sort': 'createdAt:desc',
        'populate': 'user',
        'pagination[page]': '1',
    }])

    commentList.value = commentRes.data
}

const createFakeComment = async () => {
    if (!userId.value || !userToken.value) {
        MessagePlugin.error('请输入用户id和token')
        return
    }
    await initCommentList()
    const randomNum = Math.floor(Math.random() * 5) + 5
    let num = 0

    const doFakeComment = setInterval(() => {
        let text = `测试评论${num + 1}`
        const randomIndex = Math.floor(Math.random() * commentList.value.length)
        const randomRoot = () => {
            if (Math.floor(Math.random() * 10) > 3) {
                return commentList.value[randomIndex].documentId
            } else {
                return null
            }
        } 

        submitFakeComment({
            root_comment: randomRoot(),
            comment_text: text,
            userToken: userToken.value,
        }).then(res => {
            if (res.code === 0) {
                MessagePlugin.success(`第${num}条数据发布成功`)
            } else {
                MessagePlugin.error(`第${num}条数据发布失败`)
            }
        })
        
        num++

        if (num === randomNum) {
            clearInterval(doFakeComment)
        }
    }, 100)
}

</script>

<style scoped></style>