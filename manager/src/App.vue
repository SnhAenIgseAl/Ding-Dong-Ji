<template>
	<t-layout>
		<t-header class="header">
			<t-head-menu value="item1" height="120px">
				<template #logo>
					<img width="136" class="logo" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
				</template>
				<template #operations>
					<a v-if="userStore.isLogin" href="javascript:;">
						<t-icon 
							class="t-menu__operations-icon" 
							name="logout" 
							@click="logout" />
					</a>
				</template>
			</t-head-menu>
		</t-header>
		<t-layout>
			<t-aside 
				v-if="$route.path !== '/login'"
				class="aside"
			>
				<t-affix :offset-top="56" :z-index="1" class="menu">
					<t-menu 
						theme="light" 
						v-model="menuValue"
						height="550px"
						class="aside"
					>
						<t-menu-item 
							v-for="(item, index) in menuList"
							:key="index"
							:value="item.value"
							@click="$router.push(`${item.url}`)"
						>
							<template #icon>
								<t-icon name="dashboard" />
							</template>
							{{ item.name }}
						</t-menu-item>
					</t-menu>
				</t-affix>
			</t-aside>
			
			<t-layout>
				<t-content class="content">
					<router-view></router-view>
				</t-content>
				<t-footer>Copyright @ 2025 SnhAenIgseAl. All Rights Reserved</t-footer>
			</t-layout>
		</t-layout>
	</t-layout>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import router from './router';
import { useUserStore } from './stores'

const userStore = useUserStore()

const menuList = [
	{
		name: '今日营收',
		value: 'total',
		url: '/total',
	},
	{
		name: '订单列表',
		value: 'order',
		url: '/order',
	},
	{
		name: '菜单列表',
		value: 'menu',
		url: '/menu',
	},
	{
		name: '评论列表',
		value: 'comment',
		url: '/comment',
	},
	{
		name: '分店管理',
		value: 'store',
		url: '/store',
	},
	{
		name: '个人中心',
		value: 'user',
		url: '/user'
	},
	{
		name: '批量制造测试数据',
		value: 'fakeData',
		url: '/fake-data'
	}
]

const menuValue = ref('total')

const logout = () => {
	userStore.logout()
	MessagePlugin.success('登出成功')
	router.push('/login')
}

</script>

<style scoped>

.header {
	position: sticky;
	z-index: 99;
	top: 0;
	border-bottom: 1px solid #ccc;
	box-shadow: var(--td-shadow-1);
}

.aside {
	border-right: 1px solid #ccc;
}

.menu {
	background-color: #fff;
	border-right: 1px solid #ccc;
}

.content {
	background-color: #fff;
}

</style>
