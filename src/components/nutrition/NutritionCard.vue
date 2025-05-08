<template>
    <div>
        <nutrition-date-picker
            :selected-date="selectedDate"
            :week="week"
            @change-date="onChangeDate"
            @swipe-week="onSwipeWeek"
        />
        <nutrition-kbju-card :kbju="kbju" :goals="goals" :loading="loadingKbju" class="q-mt-md" />
        <nutrition-history :records="records" :loading="loadingRecords" class="q-mt-md" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { api } from "boot/axios"
import NutritionDatePicker from "./components/NutritionDatePicker.vue"
import NutritionKbjuCard from "./components/NutritionKbjuCard.vue"
import NutritionHistory from "./components/NutritionHistory.vue"

const selectedDate = ref(new Date())
const week = ref([])
const kbju = ref({ calories: 0, proteins: 0, fats: 0, carbs: 0 })
const goals = ref({ calories: 0, proteins: 0, fats: 0, carbs: 0 })
const records = ref([])
const loadingKbju = ref(false)
const loadingRecords = ref(false)

function getWeek(date) {
    // Возвращает массив дат текущей недели (Пн-Вс)
    const d = new Date(date)
    const day = d.getDay() || 7
    d.setDate(d.getDate() - day + 1)
    return Array.from({ length: 7 }, (_, i) => {
        const dt = new Date(d)
        dt.setDate(d.getDate() + i)
        return dt
    })
}

async function fetchGoals() {
    const { data } = await api.get("/nutrition/goals")
    goals.value = data
}

async function fetchKbju(date) {
    loadingKbju.value = true
    try {
        const { data } = await api.get(`/nutrition/${date}/total`)
        kbju.value = data
    } finally {
        loadingKbju.value = false
    }
}

async function fetchRecords(date) {
    loadingRecords.value = true
    try {
        const { data } = await api.get(`/nutrition/${date}/records`)
        records.value = data
    } finally {
        loadingRecords.value = false
    }
}

function formatDate(date) {
    return date.toISOString().split("T")[0]
}

function onChangeDate(date) {
    selectedDate.value = date
    fetchKbju(formatDate(date))
    fetchRecords(formatDate(date))
}

function onSwipeWeek(direction) {
    const delta = direction === "left" ? 7 : -7
    selectedDate.value.setDate(selectedDate.value.getDate() + delta)
    week.value = getWeek(selectedDate.value)
    onChangeDate(selectedDate.value)
}

onMounted(() => {
    week.value = getWeek(selectedDate.value)
    fetchGoals()
    fetchKbju(formatDate(selectedDate.value))
    fetchRecords(formatDate(selectedDate.value))
})
</script>

<style scoped>
.nutrition-card {
    border-radius: 24px;
}
</style>
