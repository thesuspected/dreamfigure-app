<template>
    <q-tabs v-model="activeTab" class="text-primary" active-color="primary" indicator-color="primary">
        <q-tab name="calories" label="Калории" />
        <q-tab name="nutrients" label="БЖУ" />
    </q-tabs>

    <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="calories">
            <div class="chart-container">
                <v-chart class="chart" :option="caloriesChartOption" autoresize />
            </div>
        </q-tab-panel>

        <q-tab-panel name="nutrients">
            <div class="chart-container">
                <v-chart class="chart" :option="nutrientsChartOption" autoresize />
            </div>
        </q-tab-panel>
    </q-tab-panels>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import VChart from "vue-echarts"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { BarChart } from "echarts/charts"
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components"
import { useUserStore } from "stores/user/user"
import { api } from "boot/axios"

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

interface WeeklyStatsItem {
    date: string
    dayName: string
    calories: string
    proteins: string
    fats: string
    carbs: string
}

const { tgUserId } = useUserStore()
const weeklyStats = ref<WeeklyStatsItem[]>([])
const activeTab = ref("calories")

const caloriesChartOption = ref({
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
    },
    xAxis: {
        type: "category",
        data: [],
    },
    yAxis: {
        type: "value",
        name: "ккал",
    },
    series: [
        {
            name: "Калории",
            type: "bar",
            data: [],
            itemStyle: {
                color: "#FF6B6B",
            },
            label: {
                show: true,
                position: "top",
                formatter: "{c}",
            },
        },
    ],
})

const nutrientsChartOption = ref({
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    legend: {
        data: ["Белки", "Жиры", "Углеводы"],
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
    },
    xAxis: {
        type: "category",
        data: [],
    },
    yAxis: {
        type: "value",
        name: "г",
    },
    series: [
        {
            name: "Белки",
            type: "bar",
            stack: "total",
            data: [],
            itemStyle: {
                color: "#ff783d",
            },
            label: {
                show: true,
                position: "inside",
                formatter: "{c} г",
            },
        },
        {
            name: "Жиры",
            type: "bar",
            stack: "total",
            data: [],
            itemStyle: {
                color: "#FFD93D",
            },
            label: {
                show: true,
                position: "inside",
                formatter: "{c} г",
            },
        },
        {
            name: "Углеводы",
            type: "bar",
            stack: "total",
            data: [],
            itemStyle: {
                color: "#a2f04c",
            },
            label: {
                show: true,
                position: "inside",
                formatter: "{c} г",
            },
        },
    ],
})

const fetchWeeklyStats = async () => {
    try {
        const response = await api.get<WeeklyStatsItem[]>("/nutrition/weekly-stats")
        weeklyStats.value = response.data

        // Обновляем данные для графиков
        const days = weeklyStats.value.map((item) => item.dayName)

        // Обновляем график калорий
        caloriesChartOption.value.xAxis.data = days
        caloriesChartOption.value.series[0].data = weeklyStats.value.map((item) => item.calories)

        // Обновляем график БЖУ
        nutrientsChartOption.value.xAxis.data = days
        nutrientsChartOption.value.series[0].data = weeklyStats.value.map((item) => item.proteins)
        nutrientsChartOption.value.series[1].data = weeklyStats.value.map((item) => item.fats)
        nutrientsChartOption.value.series[2].data = weeklyStats.value.map((item) => item.carbs)
    } catch (error) {
        console.error("Ошибка при получении данных:", error)
    }
}

onMounted(() => {
    fetchWeeklyStats()
})
</script>

<style lang="scss" scoped>
.chart-container {
    width: 100%;
    height: 35vh;
}

.chart {
    width: 100%;
    height: 100%;
}

:deep(.q-tab-panels) {
    background: transparent;
}

:deep(.q-tab-panel) {
    padding: 0;
}
</style>
