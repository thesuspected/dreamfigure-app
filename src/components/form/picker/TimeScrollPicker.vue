<template>
    <grid-layout class="time-picker">
        <scroll-picker :model-value="hour" :options="hourOptions" @update:model-value="updateHour" />
        <scroll-picker :model-value="minute" :options="minuteOptions" @update:model-value="updateMinute" />
    </grid-layout>
</template>

<script lang="ts" setup>
import ScrollPicker from "components/form/picker/ScrollPicker.vue"
import GridLayout from "components/grid/GridLayout.vue"
import { generateHourOptions, generateMinuteOptions } from "components/form/picker/helpers"

defineProps({
    hour: {
        type: String,
        default: "10",
    },
    minute: {
        type: String,
        default: "00",
    },
})
const emit = defineEmits(["update:hour", "update:minute"])

const hourOptions = generateHourOptions()
const minuteOptions = generateMinuteOptions()

const updateHour = (value: string) => {
    emit("update:hour", value)
}
const updateMinute = (value: string) => {
    emit("update:minute", value)
}
</script>

<style lang="scss" scoped>
.time-picker {
    padding: 0 50px;
}
</style>