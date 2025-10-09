<template>
    <t-form
        ref="formRef"
        label-align="right"
        label-width="150px"
        :data="formData"
        :rules="rules"
        @submit="onSubmit"
        @reset="onReset"
    >
        <t-form-item label="分店名称" name="store_name">
            <t-input v-model="formData.store_name"></t-input>
        </t-form-item>
        <!-- <t-form-item label="分店地址" name="store_address">
            <t-input v-model="formData.store_address" @change="addressChange"></t-input>
        </t-form-item> -->
        <t-form-item label="分店地址" name="store_address">
            <t-row :gutter="[20, 20]">
                <t-col :span="4">
                    <t-select v-model="provinceName" placeholder="请选择省份">
                        <t-option 
                            v-for="(province, pIndex) in provinceList"
                            :key="pIndex" 
                            :label="province.name" 
                            :value="province.name" 
                        />
                    </t-select>
                </t-col>
                <t-col :span="4">
                    <t-select v-model="cityName" placeholder="请选择城市" :disabled="provinceName === ''">
                        <t-option 
                            v-for="(city, cIndex) in cityList"
                            :key="cIndex" 
                            :label="city" 
                            :value="city" 
                        />
                    </t-select>
                </t-col>
                <t-col :span="4">
                    <t-input 
                        v-model="addressKeyword" 
                        placeholder="请输入地址" 
                        :disabled="cityName === ''"
                        @change="addressChange"
                    />
                </t-col>
                <t-col v-if="addressList.length" :span="12" offset="12px">
                    <t-radio-group 
                        v-model="chooseAddress" 
                        @change="chooseAddressChange"
                    >
                        <t-space direction="vertical">
                            <t-radio 
                                v-for="(item, index) in addressList"
                                :key="index"
                                :value="item"
                                :disabled="item.location === undefined"
                            >
                                {{ item.name }}
                            </t-radio>
                        </t-space>
                    </t-radio-group>
                </t-col>
            </t-row>
            
        </t-form-item>
        <t-form-item label="分店起始营业时间" name="store_opening">
            <t-time-picker v-model="formData.store_opening"></t-time-picker>
        </t-form-item>
        <t-form-item label="分店结束营业时间" name="store_closing">
            <t-time-picker v-model="formData.store_closing"></t-time-picker>
        </t-form-item>
        <t-form-item>
            <t-button theme="primary" type="submit">提交</t-button>
            <t-button theme="default" variant="base" type="reset">重置</t-button>
        </t-form-item>
    </t-form>
</template>

<script setup lang="ts">
import { getCoordinate } from '@/api/index'
import debounce from 'lodash/debounce'
import { provinceList } from '@/utils/data'
import { FormRules } from 'tdesign-vue-next';

const formRef = ref()
const formData = reactive({
    store_name: '',
    store_address: '',
    store_opening: '',
    store_closing: '',
    longitude: '',
    latitude: '',
})

const rules: FormRules = {
    store_name: [
        { required: true, message: '请输入分店名称', trigger: 'blur' },
    ],
    store_address: [
        { required: true, message: '请输入分店地址', trigger: 'change' },
    ],
    store_opening: [
        { required: true, message: '请输入分店起始营业时间', trigger: 'blur' },
    ],
    store_closing:[
        { required: true, message: '请输入分店结束营业时间', trigger: 'blur' },
    ]
}

const provinceName = ref<string>('')

// 选择城市
const cityName = ref<string>('')
const cityList = computed(() => {
    let index

    index = provinceList.findIndex(item =>
        item.name === provinceName.value
    )

    return provinceList[index]?.city
})

/**
 * 输入关键字获取地址列表
 */
const addressKeyword = ref<string>('')
const addressList = ref([])
const chooseAddress = ref()
const addressChange = debounce(async (value) => {
    const res = await getCoordinate(
        value as string,
        cityName.value as string
    )

    addressList.value = res.results
}, 300)

// 选择地址
const chooseAddressChange = (value) => {
    formData.store_address = value.address
    formData.longitude = value.location.lng
    formData.latitude = value.location.lat
}

const submit = defineEmits(['submit'])

const onSubmit = () => {
    submit('submit', formData)
}

const onReset = () => {
    formData.store_address = ''
    formData.store_name= ''
    formData.store_address= ''
    formData.store_opening= ''
    formData.store_closing = ''
    formData.longitude = ''
    formData.latitude = ''
}
</script>