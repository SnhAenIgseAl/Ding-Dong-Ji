<template>
    <div class="page">
        <t-row :gutter="16">
            <t-col :span="3">
                <t-input 
                    v-model="filterText"
                    placeholder="查找评论" 
                    clearable
                >   
                    <template #suffix-icon>
                        <t-icon name="search" />
                    </template>
                </t-input>
            </t-col>
            <t-col :span="1">
                <t-button v-if="selectedRowKeys.length" theme="danger" @click="dialogVisible = true">删除</t-button>
            </t-col>
        </t-row>
        <t-table 
            hover 
            size="large" 
            tableLayout="auto" 
            row-key="documentId" 
            lazy-load
            :data="commentList" 
            :loading="commentLoading"
            :columns="commentColumns" 
            :pagination="commentPage"
            :selected-row-keys="selectedRowKeys"
            @change="handleChange"
            @select-change="rehandleSelectChange"
            :max-height="630"
        >
            <template #is_shadowban="{ row }">
                <t-switch 
                    v-model="row.is_shadowban" 
                    size="large" 
                    :loading="shadowbanLoading"
                    @change="changeShadowban(row)"
                />
            </template>
            <template #comment_text="{ row }">
                <div class="root-comment__text" v-if="row.root_comment">{{ row.root_comment.comment_text }}</div>
                <div>{{ row.comment_text }}</div>
            </template>
            <!-- <template #operation="{ row }">
                <t-link theme="danger" @click="showDialog">删除</t-link>
            </template> -->
        </t-table>
        
    </div>

    <t-dialog
        v-model:visible="dialogVisible"
        theme="warning"
        attach="#app"
        header="警告"
        body="该评论下的所有回复也将被删除，确认删除吗？"
        @cancel="dialogVisible = false"
        @confirm="onConfirm"
    />
</template>

<script setup lang="ts">
import { getCommentList, updateComment, deleteComment } from '@/api'
import { MessagePlugin, TableProps } from 'tdesign-vue-next'
import { formatDate } from '@/utils/common'

const commentLoading = ref<boolean>(true)
const commentListOrigin = ref<Comment[]>([])
const commentList = ref([])
const commentPage = reactive({
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0
})
const commentColumns: TableProps['columns'] = [
    { colKey: 'select', type: 'multiple', width: 50 },
    { colKey: 'user.username', title: '用户', width: 180 },
    { colKey: 'comment_text', title: '评论内容', width: 600 },
    { colKey: 'like_count', title: '点赞数' },
    { colKey: 'createdAt', title: '评论时间' },
    { colKey: 'is_shadowban', title: '是否shadowban', width: 180 },
    // { colKey: 'operation', title: '操作', fixed: 'right' }
]

/**
 * 初始化评论列表
 */
onMounted(() => {
    initCommentList(commentPage.defaultCurrent, commentPage.defaultPageSize)
})

const initCommentList = async (
    page: number,
    pageSize: number
) => {
    const commentRes = await getCommentList([{
        'populate': 'user',
        'sort': 'createdAt:desc',
        'pagination[page]': page + '',
        'pagination[pageSize]': pageSize + ''
    }, {
        'populate': 'root_comment',
    }])
    commentListOrigin.value = commentRes.data
    commentPage.total = commentRes.meta.pagination.total
    commentLoading.value = false

    commentList.value = commentListOrigin.value
    commentList.value.map(item => {
        item.createdAt = formatDate(item.createdAt)
    })
}



/**
 * 切换分页
 */
const handleChange: TableProps['onChange'] = (pagination) => {
    const { current, pageSize } = pagination.pagination
    initCommentList(current, pageSize)
}



/**
 * 选中行并操作
 */ 
const selectedRowKeys = ref([])

const rehandleSelectChange: TableProps['onSelectChange'] = (value) => {
    selectedRowKeys.value = value
}



// 删除评论确认框
const dialogVisible = ref<boolean>(false)

const onConfirm = async () => {
    await batchDelete()
    dialogVisible.value = false
}


// 批量删除评论
const deleteLoading = ref<boolean>(false)
const batchDelete = async () => {
    deleteLoading.value = true
    try {
        selectedRowKeys.value.map(item => {
            deleteComment(item)
        })
        MessagePlugin.success(`删除成功`)
        setTimeout(async () => {
            await initCommentList(commentPage.defaultCurrent, commentPage.defaultPageSize)
        }, 300)
    } catch {
        MessagePlugin.error(`删除失败`)
    }
    deleteLoading.value = false
}



/**
 * 搜索评论
 */
const filterText = ref('')
watch(filterText, (newVal) => {
    commentList.value = commentListOrigin.value.filter(item =>
        item.comment_text.includes(newVal)
    )   
})



/**
 * 修改评论shadowban状态
 */
const shadowbanLoading = ref<boolean>(false)
const changeShadowban = (row: Comment) => {
    shadowbanLoading.value = true
    updateComment({
        id: row.documentId,
        is_shadowban: row.is_shadowban
    }).then(res => {
        if (!res.error) {
            MessagePlugin.success('修改成功')
        } else {
            MessagePlugin.error('修改失败')
        }
    })
    shadowbanLoading.value = false
}

</script>

<style scoped>
.root-comment__text {
    color: #999;
    padding-left: 8px;
    margin-bottom: 8px;
    border-left: 2px solid #ccc;
}
</style>