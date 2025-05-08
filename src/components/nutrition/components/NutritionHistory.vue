<template>
    <q-card flat class="history-card rounded-borders">
        <div class="text-h6 q-mb-md">История</div>
        <q-spinner v-if="loading" size="24px" class="q-mb-md" />
        <div v-else>
            <div v-if="records.length === 0" class="text-grey">Нет записей за этот день</div>
            <q-list v-else>
                <q-item v-for="(rec, idx) in records" :key="idx" class="q-mb-sm history-item">
                    <q-item-section>
                        <div class="row items-center justify-between">
                            <div class="text-bold">{{ rec.foodName }}</div>
                            <div class="text-caption text-grey">{{ formatTime(rec.timestamp) }}</div>
                        </div>
                        <div class="row items-end justify-between">
                            <div>
                                <div class="text-h6">{{ rec.calories }} ккал</div>
                                <div class="row q-gutter-sm">
                                    <div class="macro macro-p">Б {{ rec.proteins }}г</div>
                                    <div class="macro macro-f">Ж {{ rec.fats }}г</div>
                                    <div class="macro macro-c">У {{ rec.carbs }}г</div>
                                </div>
                            </div>
                            <div>
                                {{ rec.foodType }}
                            </div>
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-card>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
    records: { type: Array, required: true },
    loading: Boolean,
})
function formatTime(ts) {
    const date = new Date(ts)
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
}
</script>

<style scoped>
.history-card {
    border-radius: 20px;
    background: #fff;
}
.rounded-borders {
    border-radius: 20px;
}
.history-item {
    border-radius: 14px;
    background: #f5f6fa;
    padding: 12px;
}
.macro {
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    padding: 2px 8px;
    background: #ececec;
}
.macro-p {
    color: #e57373;
}
.macro-f {
    color: #ffb300;
}
.macro-c {
    color: #42a5f5;
}
</style>
