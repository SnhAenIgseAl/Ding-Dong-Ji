<template>
    <div class="page">
        <t-row :gutter="16">
            <t-col :span="3">
                <t-input v-model="filterText" placeholder="查找菜品" clearable>
                    <template #suffix-icon>
                        <t-icon name="search" />
                    </template>
                </t-input>
            </t-col>
        </t-row>
        <t-table 
            hover 
            size="large" 
            tableLayout="auto" 
            row-key="documentId" 
            lazy-load 
            :data="menuList"
            :loading="menuLoading" 
            :columns="commentColumns" 
            :pagination="menuPage"
            @change="handleChange" 
            :max-height="630"
        >
            <template #menu_img="{ row }">
                <t-image
                    v-if="row.menu_img"
                    :src="row.menu_img.url"
                    fit="cover"
                    :style="{ width: '100px', height: '100px' }"
                />
            </template>
            <template #operation="{ row }">
                <t-link 
                    v-if="row.stores.some((store: Store) => store.documentId === userStore.userState.store.documentId)"
                    theme="danger" 
                    @click="changeMenuStatus(row.documentId, 0)"
                >
                    售空
                </t-link>
                <t-link 
                    v-else
                    theme="primary" 
                    @click="changeMenuStatus(row.documentId, 1)"
                >
                    上架
                </t-link>
            </template>
        </t-table>

    </div>
</template>

<script setup lang="ts">
import { getMenuList, changeMenuOwn } from '@/api'
import { useUserStore } from '@/stores';
import { MessagePlugin, TableProps } from 'tdesign-vue-next'

const userStore = useUserStore()

const menuLoading = ref<boolean>(true)
const menuListOrigin = ref<Menu[]>([])
const menuList = ref([])
const menuPage = reactive({
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0
})
const commentColumns: TableProps['columns'] = [
    { colKey: 'menu_img', title: '菜品图片' },
    { colKey: 'menu_class.class_name', title: '菜品分类' },
    { colKey: 'menu_name', title: '菜品名称' },
    { colKey: 'menu_price', title: '售价' },
    { colKey: 'operation', title: '操作', fixed: 'right' }
]

/**
 * 初始化菜单列表
 */
onMounted(() => {
    initMenuList(menuPage.defaultCurrent, menuPage.defaultPageSize)
})

const initMenuList = async (
    page: number,
    pageSize: number
) => {
    const menuRes = await getMenuList([{
        'populate': 'menu_class',
        'pagination[page]': page + '',
        'pagination[pageSize]': pageSize + ''
    }, {
        'populate': 'menu_img'
    }, {
        'populate': 'stores'
    }])
    menuListOrigin.value = menuRes.data
    menuList.value = menuRes.data
    menuPage.total = menuRes.meta.pagination.total
    menuLoading.value = false

    // menuList.value = menuListOrigin.value.map(item => {
    //     let hasOwn: boolean = false
    //     for (let i in item.stores) {
    //         if (item.stores[i].store_id === userStore.userState.store.store_id) {
    //             hasOwn = true
    //         }
    //     }

    //     return {
    //         ...item,
    //         hasOwn: hasOwn
    //     }
    // })
}



/**
 * 切换分页
 */
const handleChange: TableProps['onChange'] = (pagination) => {
    const { current, pageSize } = pagination.pagination
    initMenuList(current, pageSize)
}



/**
 * 更改菜品状态（上架 | 售空）
 * @param id 菜品id
 * @param action 
 */
const changeMenuStatus = (id: string, action: 0 | 1) => {
    changeMenuOwn(
        id,
        action
    ).then(async res => {
        if (!res.error) {
            MessagePlugin.success('修改成功')
            await initMenuList(menuPage.defaultCurrent, menuPage.defaultPageSize)
        } else {
            MessagePlugin.error('修改失败')
        }
    })
}



/**
 * 搜索菜品
 */
const filterText = ref('')
watch(filterText, (newVal) => {
    menuList.value = menuListOrigin.value.filter(item =>
        item.menu_name.includes(newVal)
    )
})

</script>

<style scoped></style>