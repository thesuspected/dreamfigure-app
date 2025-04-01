<template>
    <grid-layout class="date-picker" columns="1fr 1fr 1fr">
        <scroll-picker :model-value="day" :options="dayOptions" @update:model-value="updateDay" />
        <scroll-picker :model-value="month" :options="monthOptions" @update:model-value="updateMonth" />
        <scroll-picker :model-value="year" :options="yearOptions" @update:model-value="updateYear" />
    </grid-layout>
</template>

<script lang="ts" setup>
import ScrollPicker from "components/form/picker/ScrollPicker.vue"
import GridLayout from "components/grid/GridLayout.vue"
import {
    generateDayOptions,
    generateMonthOptions, generateYearOptions,
} from "components/form/picker/helpers"

defineProps({
    day: {
        type: Number,
        default: 1,
    },
    month: {
        type: Number,
        default: 0,
    },
    year: {
        type: Number,
        default: 1980,
    },
})
const emit = defineEmits(["update:day", "update:month", "update:year"])

const dayOptions = generateDayOptions()
const monthOptions = generateMonthOptions()
const yearOptions = generateYearOptions()

const updateDay = (value: number) => {
    emit("update:day", value)
}
const updateMonth = (value: number) => {
    emit("update:month", value)
}
const updateYear = (value: number) => {
    emit("update:year", value)
}
</script>

<style lang="scss" scoped>
.time-picker {
    padding: 0 50px;
}
</style>