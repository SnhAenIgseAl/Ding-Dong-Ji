<template>

    <!-- 父评论 -->
    <view 
        v-if="!isDelete"
        class="comment"
    >
        <view class="comment-avatar">
            <wd-img 
                width="90rpx"
                height="90rpx"
                :src="comment.user.avatar" 
                mode="aspectFill" 
                round
            />
        </view>

        <view class="comment-content">

            <view class="comment-content__name">{{ comment.user.username }}</view>
            
            <view 
                v-if="comment.root_comment"
                class="comment-content__root-text"
            >
                {{ comment.root_comment.comment_text }}
            </view>
            
            <view class="comment-content__text">{{ comment.comment_text }}</view>
           
            <view class="comment-action">
                <Like :comment="comment" />
                <Reply 
                    :commentId="comment.documentId" 
                    :title="`回复${comment.user.username}`" 
                    buttonText="回复" 
                    @refresh-sub-comments="openSubComments(comment.documentId)"
                />
                <view 
                    v-if="comment.sub_comments.length"
                    class="comment-content__sub-comments"
                >
                    <wd-button 
                        v-if="showSubComments === false" 
                        type="icon" 
                        icon="add-circle1" 
                        @click="openSubComments(comment.documentId)" 
                    />
                    <wd-button 
                        v-else 
                        type="icon" 
                        icon="close-circle" 
                        @click="closeSubComments"
                    />

                    <span>
                        <span
                            v-for="(subComment, index) in comment.sub_comments"
                            :key="index"
                        >
                            <wd-img 
                                width="32rpx"
                                height="32rpx"
                                :src="subComment.user.avatar" 
                                mode="aspectFill" 
                                round
                            />
                        </span>
                    </span>
                </view>
                <Delete 
                    v-if="comment.user.documentId === userStore.userState?.documentId" 
                    :commentId="comment.documentId" 
                    @delete-comments="isDelete = true"
                />
            </view>
        </view>
    </view>

    <!-- 子评论 -->
    <view :class="{ 'sub-comments': deep > 0 }">
        <CommentComponent
            v-if="subComments"
            v-for="(subcomment, index) in subComments" 
            :key="index" 
            :comment="subcomment"
            :deep="deep - 1"
        />
    </view>
    
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommentComponent from './comment.vue'
import { getSubComments, BASE_SERVER_URL } from '@/api/index'
import { useUserStore } from '@/stores';
import Like from './like.vue';
import Reply from './reply.vue';
import Delete from './delete.vue';

const userStore = useUserStore()

const {
    comment,
    deep
} = defineProps({
    comment: {
        type: Object as () => Comment,
        required: true
    },
    deep: {
        type: Number,
        default: 2
    }
})

const isDelete = ref<boolean>(false)
const showSubComments = ref<boolean>(false)
const subComments = ref<Comment[]>([])

// 展开子评论
const openSubComments = async (commentId: string) => {
    showSubComments.value = true

    await getSubComments(commentId).then(res => {
        subComments.value = res.data
    })

    console.log(subComments.value);
}

// 关闭子评论
const closeSubComments = () => {
    showSubComments.value = false
    subComments.value = []
}

</script>

<style scoped>
.comment {
    display: flex;
    margin: 32rpx;
    box-sizing: border-box;
}

.comment-avatar {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    margin-right: 32rpx;
}

.comment-content {
    display: flex;
    flex-flow: column nowrap;
    gap: 24rpx;
}

.comment-content__sub-comments {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comment-content__root-text {
    border-left: 6rpx solid #999;
    padding-left: 16rpx;
    color: #999;
    box-sizing: border-box;
}

.comment-action {
    display: flex;
    align-items: center;
    margin-left: -24rpx;
}

.sub-comments {
    margin-left: 122rpx;
}

</style>