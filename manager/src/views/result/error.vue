<template>
    <div class="result">
        <t-typography-title level="h1">
            {{ errMsg[errCode] }}
        </t-typography-title>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()
const errCode = ref<number>()

const errMsg = {
    [400]: '400 | Bad Request',
    [401]: '401 | Unauthorized',
    [403]: '403 | Forbidden',
    [404]: '404 | Not Found',
    [500]: '500 | Server Error'
}

errCode.value = parseInt(route.params.code as string)

watch(() => route.params.code, (newVal) => {
    errCode.value = parseInt(newVal as string)
})


</script>

<style scoped lang="scss">
</style>