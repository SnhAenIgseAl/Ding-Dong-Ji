<template>
    <div class="page">
        <t-card title="生成订单数据" header-bordered>
            <t-input v-model="userToken" placeholder="用户token"></t-input>
            <template #footer>
                <t-button primary @click="createFakeOrder">生成订单（堂食、外带随机 | 20~30条）</t-button>
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
import { submitFakeOrder, submitFakeComment, getMenuList, getCommentList } from '@/api'
import { MessagePlugin } from 'tdesign-vue-next'
import { useUserStore } from '@/stores'
import { sleep } from '@/utils/common'

const userStore = useUserStore()

const userToken = ref<string>()

const menuList = ref<Menu[]>()
const initMenuList = async () => {
    const menuRes = await getMenuList([
        { 'populate': 'menu_flavors' }
    ])
    menuList.value = menuRes.data
}


const createFakeOrder = async () => {
    if (!userToken.value) {
        MessagePlugin.error('请输入用户id和token')
        return
    }
    await initMenuList()


    const randomOrderMode = () => {
        if (Math.floor(Math.random() * 10) > 5) { 
            return 'dine_in'
        } else {
            return 'takeout'
        }
    }

    const randomMenu = (index: number) => {
        let res = {}

        function getRandomArr() {
            let arr = []
            for (let i = 0; i < index; i++) {
                arr.push(i)
            }
            return arr
        }

        for (let i in getRandomArr()) {
            const randomMenuName = menuList.value[i].menu_name
            res[randomMenuName] = menuList.value[i]
            res[randomMenuName].menu_number = Math.floor(Math.random() * 5) + 1
        }

        return res
    }

    const randomNum = Math.floor(Math.random() * 10) + 20
    for (let num = 1; num <= randomNum; num++) {
        const randomIndex = Math.floor(Math.random() * menuList.value.length) + 1

        await submitFakeOrder({
            store: userStore.userState.store.documentId,
            order_mode: randomOrderMode(),
            userToken: userToken.value,
            order_list: randomMenu(randomIndex)
        }).then(res => {
            if (res.code === 0) {
                MessagePlugin.success(`第${num}条数据发布成功`)
            } else {
                MessagePlugin.error(`第${num}条数据发布失败`)
            }
        })

        await sleep(200)
    }
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
    if (!userToken.value) {
        MessagePlugin.error('请输入用户id和token')
        return
    }
    await initCommentList()

    const randomNum = Math.floor(Math.random() * 5) + 5
    for (let num = 1; num <= randomNum; num++) {
        const text = `测试评论${num + 1}`
        const randomIndex = Math.floor(Math.random() * commentList.value.length)
        const randomRoot = () => {
            if (Math.floor(Math.random() * 10) > 3) {
                return commentList.value[randomIndex].documentId
            } else {
                return null
            }
        } 

        await submitFakeComment({
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
        await sleep(200)
    }
}
</script>

<style scoped></style>