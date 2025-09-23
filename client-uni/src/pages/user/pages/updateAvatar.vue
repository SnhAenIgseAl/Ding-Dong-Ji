<template>
	<Navbar title="修改头像" />
	<view class="sub-page" style="background-color: #fff;">
		<wd-img-cropper 
			v-model="show" 
			:img-src="src" 
			aspect-ratio="1:1"
			@confirm="handleConfirm" 
			@cancel="handleCancel"
		>
		</wd-img-cropper>
		<view class="profile">
			<view v-if="!imgSrc" class="img" @click="upload">
				<wd-icon name="fill-camera" custom-class="img-icon" size="36rpx"></wd-icon>
			</view>
			<wd-img 
				v-if="imgSrc" 
				round 
				width="360rpx" 
				height="360rpx" 
				:src="imgSrc" 
				mode="aspectFit" 
				custom-class="profile-img"
				@click="upload" 
			/>
			<view>点击上传头像</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import { useUpload, useToast } from 'wot-design-uni'
import { BASE_URL, BASE_UPLOAD_URL } from '@/config/api.config'
import { useUserStore } from '@/stores/index'
import { updateUser } from '@/api/index'

const { startUpload, UPLOAD_STATUS } = useUpload()
const toast = useToast()
const { userToken } = useUserStore()

const src = ref('')
const imgSrc = ref('')
const show = ref(false)

const upload = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			const tempFilePaths = res.tempFilePaths[0]
			src.value = tempFilePaths
			show.value = true
		}
	})
}

const handleConfirm = async (event) => {
	const { tempFilePath } = event
	
	const file = {
		url: tempFilePath,
		status: UPLOAD_STATUS.PENDING,
		percent: 0,
		uid: new Date().getTime()
	}

	try {
		// 获取用户上传后的图片id
		const avatarId = await new Promise<number>(async (resolve, reject) => {
		    await startUpload(file, {
				action: BASE_UPLOAD_URL,
				header: {
					Authorization: `Bearer ${userToken}`
				},
				name: 'files',
				statusCode: 201,
				onSuccess({ data }) {
					const img: Image = JSON.parse(data)[0]
					imgSrc.value = BASE_URL + img.url
					// toast.success('上传成功')
					resolve(img.id)
				},
				onError() {
					toast.error('上传失败')
				},
			})
		})
		console.log(avatarId)

		// 更新头像
		updateUser({
			avatar: avatarId
		}).then(() => {
			toast.success('更改成功')
		})
	} catch (error) {
		console.error('上传失败:', error)
	}
}

const handleCancel = (event) => {
	console.log('取消', event)
}

</script>

<style scoped>
.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.img {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 360rpx;
	height: 360rpx;
	border-radius: 50%;
	border: 2rpx solid #ccc;
	
}
</style>