<template>
    <Navbar title="评论墙" />
    <view class="comment-page">
        <view class="title" style="margin: 32rpx;">评论墙</view>
        <view 
            v-if="commentLoad" 
            v-for="i in 8"
            style="display: flex; padding: 32rpx;"
        >
            <wd-skeleton 
                :row-col="[
                    { size: '90rpx', type: 'circle' },
                ]" 
                animation="gradient"
                :loading="commentLoad"
                :custom-style="{ marginRight: '32rpx' }"
            />
            <wd-skeleton 
                :loading="commentLoad" 
                :custom-style="{ width: '100%' }" 
                :row-col="[
                    { width: '50%' }, 
                    { width: '100%' },
                ]" 
                animation="gradient" 
            />
        </view>

        <Comment 
            v-if="!commentLoad && commentsList.length"
            v-for="(comment, index) in commentsList" 
            :key="index" 
            :comment="comment"
            :deep="2"
        />

        <wd-status-tip 
            v-else-if="!commentLoad && !commentsList.length"
            image="content" 
            tip="暂无评论" 
        />

        <view class="add-comment" @click="show = true">
            <wd-icon name="add" size="48rpx" color="#fff"></wd-icon>
        </view>
        
        <wd-action-sheet 
            v-model="show" 
            title="发表评论" 
        >
            <view class="reply-content">
                <wd-input 
                    v-model="comment_text" 
                    clearable 
                />
                <wd-button @click="reply">发表</wd-button>
            </view>
        </wd-action-sheet>
        <wd-toast />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Comment from './components/comment.vue'
import { getCommentsList, replyComment } from '@/api/index'
import { useToast } from 'wot-design-uni'

const commentsList = ref<Comment[]>([])
const commentLoad = ref<boolean>(true)
const show = ref<boolean>(false)
const comment_text = ref<string>('')
const toast = useToast()

const initComment = async () => {
    await getCommentsList().then(res => {
        commentsList.value = res.data
        commentLoad.value = false
    })
}

initComment()

const reply = () => {
    if (!comment_text.value) {
        toast.warning('请输入评论内容')
        return
    }
    
    replyComment({
        comment_text: comment_text.value,
    }).then(res => {
        if (res.data!.documentId) {
            toast.success('发表评论成功')
            show.value = false
            comment_text.value = ''

            initComment()
        }
    })
}
</script>

<style lang="scss" scoped>

.comment-page {
    box-sizing: border-box;
}

.add-comment {
    position: fixed;
    bottom: 160rpx;
    right: 32rpx;
    z-index: 9;
    padding: 24rpx;
    border-radius: 50%;
    background-color: #4D80F0;
    box-sizing: border-box;
}

.reply-content {
    display: flex;
    flex-flow: column nowrap;
    gap: 32rpx;
    justify-content: center;
    padding: 32rpx;
}

</style>