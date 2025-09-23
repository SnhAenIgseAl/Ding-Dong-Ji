<template>
    <div :style="{
        position: 'relative',
        backgroundColor: bgColor
    }" class="border-round">
        <div class="title">
            <t-typography-title level="h4" style="font-weight: bold;">{{ title }}</t-typography-title>
        </div>
        <div :id="id" :style="{
            width: width,
            height: height,
            backgroundColor: bgColor
        }" />
    </div>
    
</template>

<script setup lang="ts">
import echarts from '@/utils/echarts'

const {
    id,
    title,
    width,
    height,
    data,
    bgColor
} = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '240px'
    },
    data: {
        type: Array as () => Array<{
            name: string,
            value: number
        }>,
        default: () => []
    },
    bgColor: {
        type: String,
        default: '#fff'
    }
})

onMounted(() => {
    const ecPie = echarts.init(document.getElementById(id), 'westeros')
    ecPie.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'bottom'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 8
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                data: data.sort(function (a, b) {
                    return a.value - b.value;
                })
            }
        ]
    })
    window.addEventListener('resize', () => {
        ecPie.resize()
    })
})

</script>

<style scoped>
.title {
    padding: 20px;
    padding-top: 1px;
}
</style>