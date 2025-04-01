<template>
    <div class="page q-pa-md">
        <action-button label="Начальная форма" @click="goToInitialForm" />
        <action-button label="Добавить блюдо" @click="goToNutritionForm" />
    </div>
</template>

<script setup lang="ts">
import "vue-scroll-picker/style.css"
import ActionButton from "components/buttons/ActionButton.vue"
import { useRouter } from "vue-router"
import { RouteNames } from "src/router/routes"

const router = useRouter()
const goToInitialForm = () => {
    router.push({ name: RouteNames.USER_INITIAL_FORM })
}
const goToNutritionForm = () => {
    router.push({ name: RouteNames.ADD_NUTRITION_FORM })
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
