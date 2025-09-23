<template>
	<view>
		<Home v-if="tabIndex === 0" />
		<Comment v-if="tabIndex === 1" />
		<Vip v-if="tabIndex === 2" />
		<User v-if="tabIndex === 3" />
	</view>

	<TabBar />
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
import Home from '@/pages/home/home.vue'
import Comment from '@/pages/comment/comment.vue'
import Vip from '@/pages/vip/vip.vue'
import User from '@/pages/user/user.vue'
import { useTabStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

const {
	tabIndex
} = storeToRefs(useTabStore())

// tabIndex.value = 0

</script>

<style scoped></style>
