<template>
    <wd-button type="icon" icon="keyboard-collapse" @click="show = !show"></wd-button>
    <wd-action-sheet 
        v-model="show" 
        :title="title" 
    >
        <view class="reply-content">
            <wd-input 
                v-model="comment_text" 
                clearable 
            />
            <wd-button @click="reply">{{ buttonText }}</wd-button>
        </view>
    </wd-action-sheet>
    <wd-toast />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { replyComment } from '@/api/index'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const {
    commentId,
    title,
    buttonText
} = defineProps({
    commentId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    buttonText: {
        type: String,
        required: true,
    }
})

const show = ref<boolean>(false)
const comment_text = ref<string>('')

const emit = defineEmits(['refreshSubComments'])

const reply = () => {
    if (!comment_text.value) {
        toast.warning('请输入评论内容')
        return
    }

    replyComment({
        root_comment: commentId,
        comment_text: comment_text.value,
    }).then(res => {
        if (res.data.documentId) {
            toast.success('回复成功')
            show.value = false
            comment_text.value = ''

            emit('refreshSubComments')
        }
    })
}



</script>

<style lang="scss" scoped>

.reply-content {
    display: flex;
    flex-flow: column nowrap;
    gap: 32rpx;
    // align-items: center;
    justify-content: center;
    padding: 32rpx;
}
</style>