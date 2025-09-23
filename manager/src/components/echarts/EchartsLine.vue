<template>
    <div :style="{
        position: 'relative',
        backgroundColor: bgColor
    }" class="border-round">
        <div class="title">
            <t-typography-title level="h4">{{ title }}</t-typography-title>
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
    xAxisData,
    yAxisData,
    series,
    width,
    height,
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
    xAxisData: {
        type: Array,
        required: true
    },
    yAxisData: {
        type: Array,
    },
    series: {
        type: Array,
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
    bgColor: {
        type: String,
        default: '#fff'
    }
})

onMounted(() => {
    series.map((item: any) => {
        item.areaStyle = {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: '#0052d9'
                },
                {
                    offset: 1,
                    color: '#59c4e6'
                }
            ])
        }
    })

    const ecLine = echarts.init(document.getElementById(id), 'westeros')
    ecLine.setOption({
        tooltip: {
            trigger: 'axis',
            position: function (pt: any) {
                return [pt[0], '10%'];
            }
        },
        // title: {
        //     left: 'center',
        //     text: title
        // },
        toolbox: {
            show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            data: yAxisData
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        grid: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 64,
            containLabel: true
        },
        series: series
    })
    window.addEventListener('resize', () => {
        ecLine.resize()
    })
})

</script>

<style scoped>
.title {
    padding: 20px;
    padding-top: 1px;
}
</style>