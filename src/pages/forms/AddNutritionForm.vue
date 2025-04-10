<template>
    <div class="page q-pa-md">
        <div class="header">
            <back-arrow-button @click="handleBackButton" />
            <h1>Добавить блюдо</h1>
        </div>
        <div class="content">
            <select-slider v-model="form.foodType" :options="foodTypeOptions" label="Прием пищи" />
            <grid-layout columns="2fr 1fr">
                <form-input
                    ref="foodNameRef"
                    v-model="form.foodName"
                    label="Название"
                    placeholder="Введите название"
                    @enter="caloriesRef.focusInputRef()"
                />
                <form-input
                    ref="caloriesRef"
                    v-model="form.calories"
                    inputmode="numeric"
                    label="калории"
                    placeholder="0 ккал"
                    mask="# ккал"
                    reverse-fill-mask
                    unmasked-value
                    @enter="proteinsRef.focusInputRef()"
                />
            </grid-layout>
            <grid-layout columns="1fr 1fr 1fr">
                <form-input
                    ref="proteinsRef"
                    v-model="form.proteins"
                    inputmode="numeric"
                    label="белки"
                    placeholder="0 г"
                    mask="# г"
                    reverse-fill-mask
                    unmasked-value
                    @enter="fatsRef.focusInputRef()"
                />
                <form-input
                    ref="fatsRef"
                    v-model="form.fats"
                    inputmode="numeric"
                    label="жиры"
                    placeholder="0 г"
                    mask="# г"
                    reverse-fill-mask
                    unmasked-value
                    @enter="carbsRef.focusInputRef()"
                />
                <form-input
                    ref="carbsRef"
                    v-model="form.carbs"
                    inputmode="numeric"
                    label="углеводы"
                    placeholder="0 г"
                    mask="# г"
                    reverse-fill-mask
                    unmasked-value
                />
            </grid-layout>
        </div>
        <MainButton text="Добавить" @click="handleMainButton" />
    </div>
</template>

<script lang="ts" setup>
import BackArrowButton from "components/buttons/BackArrowButton.vue"
import { useRouter } from "vue-router"
import { ref } from "vue"
import FormInput from "components/form/input/FormInput.vue"
import GridLayout from "components/grid/GridLayout.vue"
import SelectSlider from "components/slider/SelectSlider.vue"
import { MainButton } from "vue-tg"
import { getFoodTypeOptions } from "pages/forms/helpers"

const router = useRouter()

// input refs
const foodNameRef = ref()
const caloriesRef = ref()
const proteinsRef = ref()
const fatsRef = ref()
const carbsRef = ref()

const form = ref({
    foodName: undefined,
    foodType: "breakfast",
    calories: undefined,
    proteins: undefined,
    fats: undefined,
    carbs: undefined,
})

const foodTypeOptions = getFoodTypeOptions()

const handleBackButton = () => {
    router.back()
}
const handleMainButton = () => {

}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .content {
        display: flex;
        flex-direction: column;
        padding-top: 40px;
    }
}
</style>