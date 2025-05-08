<template>
    <q-card flat class="kbju-card q-pa-md rounded-borders">
        <div class="row items-center">
            <!-- Левая часть: Круговой прогресс с калориями -->
            <div class="col-auto flex column flex-center q-pr-lg">
                <q-circular-progress
                    :value="(kbju.calories / goals.calories) * 100"
                    show-value
                    :angle="0"
                    size="100px"
                    color="black"
                    track-color="grey-4"
                    rounded
                >
                    <div class="circular">
                        <span class="inner-value">{{ kbju.calories }}</span>
                        <span class="inner-text q-pt-xs">{{ goals.calories }} кк</span>
                    </div>
                </q-circular-progress>
                <!-- <span class="q-mt-sm">из {{ goals.calories }} ккал</span> -->
            </div>
            <!-- Правая часть: БЖУ -->
            <div class="col">
                <div class="q-mb-sm">
                    <div class="row items-center justify-between">
                        <span class="text-bold">Белки</span>
                        <span>{{ kbju.proteins }}/{{ goals.proteins }}г</span>
                    </div>
                    <q-linear-progress
                        :value="kbju.proteins / goals.proteins"
                        color="red"
                        track-color="grey-4"
                        rounded
                        size="10px"
                    />
                </div>
                <div class="q-mb-sm">
                    <div class="row items-center justify-between">
                        <span class="text-bold">Жиры</span>
                        <span :class="{ 'text-negative': kbju.fats > goals.fats }"
                            >{{ kbju.fats }}/{{ goals.fats }}г</span
                        >
                    </div>
                    <q-linear-progress
                        :value="kbju.fats / goals.fats"
                        color="orange"
                        track-color="grey-4"
                        rounded
                        size="10px"
                    />
                </div>
                <div>
                    <div class="row items-center justify-between">
                        <span class="text-bold">Углеводы</span>
                        <span>{{ kbju.carbs }}/{{ goals.carbs }}г</span>
                    </div>
                    <q-linear-progress
                        :value="kbju.carbs / goals.carbs"
                        color="blue"
                        track-color="grey-4"
                        rounded
                        size="10px"
                    />
                </div>
            </div>
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

<style scoped lang="scss">
.kbju-card {
    border-radius: 20px;
    background: $blue-light;
    .circular {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .inner-value {
            font-size: 20px;
            font-weight: 600;
        }
        .inner-text {
            font-size: 14px;
            color: $grey-8;
            border-top: 1px solid $grey-4;
            margin-top: 5px;
        }
    }
}
</style>
