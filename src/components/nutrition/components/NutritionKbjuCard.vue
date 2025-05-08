<template>
    <q-card flat class="kbju-card q-pa-md rounded-borders">
        <div class="row items-center q-mb-md">
            <div class="text-h5">{{ kbju.calories }}<span class="text-subtitle2"> ккал осталось</span></div>
            <q-spinner v-if="loading" size="24px" class="q-ml-sm" />
        </div>
        <div class="q-mb-sm">
            <div class="row items-center justify-between">
                <span class="text-bold">Белки</span>
                <span>{{ kbju.proteins }}/{{ goals.proteins }}г</span>
            </div>
            <q-linear-progress
                :value="kbju.proteins / goals.proteins"
                color="red"
                track-color="grey-3"
                rounded
                size="10px"
            />
        </div>
        <div class="q-mb-sm">
            <div class="row items-center justify-between">
                <span class="text-bold">Жиры</span>
                <span>{{ kbju.fats }}/{{ goals.fats }}г</span>
            </div>
            <q-linear-progress
                :value="kbju.fats / goals.fats"
                color="orange"
                track-color="grey-3"
                rounded
                size="10px"
            />
        </div>
        <div class="q-mb-sm">
            <div class="row items-center justify-between">
                <span class="text-bold">Углеводы</span>
                <span>{{ kbju.carbs }}/{{ goals.carbs }}г</span>
            </div>
            <q-linear-progress
                :value="kbju.carbs / goals.carbs"
                color="blue"
                track-color="grey-3"
                rounded
                size="10px"
            />
        </div>
    </q-card>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
    kbju: { type: Object, required: true },
    goals: { type: Object, required: true },
    loading: Boolean,
})
</script>

<style scoped>
.kbju-card {
    border-radius: 20px;
    background: #fafbfc;
}
.rounded-borders {
    border-radius: 20px;
}
</style>
