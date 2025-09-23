<template>
    <wd-button 
        type="icon" 
        icon="delete" 
        @click="del">
    </wd-button>
    <wd-toast />
</template>

<script setup lang="ts">
import { deleteComment } from '@/api/index'
import { useToast } from 'wot-design-uni'

const toast = useToast()

const {
    commentId
} = defineProps({
    commentId: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['deleteComments'])

const del = () => {
    deleteComment(commentId).then(res => {
        if (res.code === 0) {
            toast.success('删除成功')
            emit('deleteComments')
        } else {
            toast.error(res.message!)
        }
    })
}

</script>

<style scoped>
</style>