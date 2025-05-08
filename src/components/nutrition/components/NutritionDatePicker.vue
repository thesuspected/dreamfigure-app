<template>
    <div class="date-picker q-pa-sm q-mb-md">
        <div class="row items-center justify-between">
            <q-btn flat round icon="chevron_left" @click="swipeWeek('right')" />
            <div class="row items-center">
                <div
                    v-for="(date, idx) in week"
                    :key="idx"
                    :class="['day-btn', { active: isSelected(date) }]"
                    @click="selectDate(date)"
                >
                    <div class="day-label">{{ days[idx] }}</div>
                    <div class="date-label">{{ date.getDate() }}</div>
                </div>
            </div>
            <q-btn flat round icon="chevron_right" @click="swipeWeek('left')" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
const props = defineProps({
    selectedDate: Date,
    week: Array,
})
const emit = defineEmits(["change-date", "swipe-week"])

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

function isSelected(date) {
    return (
        date.getDate() === props.selectedDate.getDate() &&
        date.getMonth() === props.selectedDate.getMonth() &&
        date.getFullYear() === props.selectedDate.getFullYear()
    )
}
function selectDate(date) {
    emit("change-date", date)
}
function swipeWeek(direction) {
    emit("swipe-week", direction)
}
</script>

<style scoped>
.date-picker {
    border-radius: 16px;
    background: #fff;
}
.day-btn {
    cursor: pointer;
    border-radius: 12px;
    padding: 8px 12px;
    margin: 0 2px;
    text-align: center;
    transition: background 0.2s;
}
.day-btn.active {
    background: #222;
    color: #fff;
}
.day-label {
    font-size: 12px;
    opacity: 0.7;
}
.date-label {
    font-size: 16px;
    font-weight: bold;
}
</style>
