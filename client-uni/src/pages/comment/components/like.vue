<template>
    <wd-button 
        v-if="!isLiked"
        type="icon" 
        icon="star" 
        @click="like"
    >
        <span style="margin-left: 8rpx;">{{ likeCount }}</span>
    </wd-button>
    <wd-button 
        v-else
        type="icon" 
        icon="star-filled" 
        @click="cancel"
    >
        {{ likeCount }}
    </wd-button>
    <wd-toast />
</template>

<script setup lang="ts">
import { likeComment } from '@/api/index'
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/stores';

const userStore = useUserStore()

const toast = useToast()

const {
    comment
} = defineProps({
    comment: {
        type: Object as () => Comment,
        default: ''
    }
})

const isLiked = ref<boolean>(comment.comment_likes.some((item) => item.user.documentId === userStore.userState?.documentId))
const likeCount = ref<number>(comment.like_count)

const like = () => {
    likeComment({
        id: comment.documentId,
        action: 1
    }).then(res => {
        if (res.code === 0) {
            toast.success('点赞成功')
            isLiked.value = true
            likeCount.value++
        } else {
            toast.error(res.message!)
        }
    })
}

const cancel = () => {
    likeComment({
        id: comment.documentId,
        action: 0
    }).then(res => {
        if (res.code === 0) {
            toast.success('取消点赞成功')
            isLiked.value = false
            likeCount.value--
        } else {
            toast.error(res.message!)
        }
    })
}

</script>

<style scoped>
</style>