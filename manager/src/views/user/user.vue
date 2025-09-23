<template>

    <div class="page">
        <t-card title="更改头像" header-bordered>
            <t-image
                :src="imgUrl"
                shape="circle"
                fit="cover"
                class="avatar"
            />
            <t-upload
                v-model="file"
                :request-method="uploadImg"
                show-upload-progress
            />
            <template #footer>
                <t-button 
                    @click="updateAvatar" 
                    :loading="avatarButtonLoading"
                    :disabled="!canUpdate"
                >
                    更改
                </t-button>
            </template>
        </t-card>

        <t-card title="更改用户名" header-bordered>
            <t-input placeholder="请输入用户名" v-model="username" />
            <template #footer>
                <t-button @click="updateUsername" :loading="usernameButtonLoading">更改</t-button>
            </template>
        </t-card>

        <t-card title="更改密码" header-bordered>
            <t-typography-text>将发送一封带有重置密码的链接</t-typography-text>
            <template #footer>
                <t-button @click="sendEmail" :loading="sendButtonLoading">发送</t-button>
            </template>
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { UploadProps, MessagePlugin, RequestMethodResponse } from 'tdesign-vue-next'
import { uploadAvatar, updateUser, forgetPassword, BASE_URL } from '@/api'
import { useUserStore } from '@/stores';

const userStore = useUserStore()

const file = ref<UploadProps['value']>([])
const avatarButtonLoading = ref<boolean>(false)
const avatarUrl = ref<string>('')
const imgUrl = ref<string>('')
const canUpdate = ref<boolean>(false)

onMounted(async () => {
    await userStore.getUserStateAsync()
    imgUrl.value = userStore.userState.avatar
})

// 仅上传图片，不更改
const uploadImg = async (file) => {
    return new Promise<RequestMethodResponse>((resolve, reject) => {
        uploadAvatar(file.raw).then(res => {
            imgUrl.value = BASE_URL + res[0].url
            avatarUrl.value = imgUrl.value
            canUpdate.value = true
        })

        resolve({
            status: 'success',
            response: {
                url: imgUrl.value
            }
        })
    })
}

const updateAvatar = async () => {
    avatarButtonLoading.value = true
    console.log(avatarUrl.value);
    
    updateUser({
        avatar: avatarUrl.value
    }).then(res => {
        if (!res.error) {
            MessagePlugin.success('更改成功')
            avatarButtonLoading.value = false
        }
    })
}

const username = ref<string>(userStore.userState.username)
const usernameButtonLoading = ref<boolean>(false)
const updateUsername = async () => {
    usernameButtonLoading.value = true
    updateUser({
        username: username.value
    }).then(res => {
        if (res.code === 0) {
            MessagePlugin.success('更改成功')
            usernameButtonLoading.value = false
        }
    })
}

const sendButtonLoading = ref<boolean>(false)
const sendEmail = () => {
    sendButtonLoading.value = true
    forgetPassword(userStore.userState.email).then(res => {
        if (res.ok) {
            MessagePlugin.success('发送成功')
            sendButtonLoading.value = false
        }
    })
}
</script>

<style scoped>

.avatar {
    width: 120px;
    height: 120px;
    margin: 20px 0;
}

.user-info {
    padding: 20px;
    background-color: #fff;
}

</style>