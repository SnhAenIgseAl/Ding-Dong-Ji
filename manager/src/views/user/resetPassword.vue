<template>
    <div class="page">
        <t-card title="更改密码" header-bordered>
            <t-form 
                :data="pwdForm"
                :rules="rules"
                @submit="updatePassword"
                @reset="onReset"
            >
                <t-form-item label="新密码" name="password">
                    <t-input placeholder="请输入新密码" v-model="pwdForm.password" type="password" />
                </t-form-item>
                <t-form-item label="确认密码" name="passwordConfirm">
                    <t-input placeholder="确认密码" v-model="pwdForm.passwordConfirm" type="password" />
                </t-form-item>
                <t-form-item>
                    <t-space size="large">
                        <t-button theme="primary" type="submit">提交</t-button>
                        <t-button theme="default" variant="base" type="reset">重置</t-button>
                    </t-space>
                </t-form-item>
            </t-form>
        </t-card>
    </div>
</template>

<script setup lang="ts">
import { resetPassword } from '@/api'
import { useUserStore } from '@/stores';
import { MessagePlugin, FormProps } from 'tdesign-vue-next';

const route = useRoute()
const code = ref('')
const userStore = useUserStore()

onMounted(() => {
    code.value = route.query.code as string
})

const pwdForm = reactive({
    password: '',
    passwordConfirm: ''
})

const rules: FormProps['rules']= {
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: (val: string) => val.length >= 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    passwordConfirm: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: (val: string) => val === pwdForm.password, message: '两次密码不一致', trigger: 'blur' }
    ]
}

const updatePassword: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
    if (validateResult !== true) {
        MessagePlugin.error(firstError)
        return
    }

    resetPassword({
        code: code.value,
        password: pwdForm.password,
        passwordConfirmation: pwdForm.passwordConfirm
    }).then(async (res) => {
        if (res.user) {
            MessagePlugin.success('密码更改成功')
            userStore.userToken = res.jwt
            await userStore.setUserInfoAsync()
        }
    })
}

const onReset = () => {
    pwdForm.password = ''
    pwdForm.passwordConfirm = ''
}
</script>

<style scoped></style>