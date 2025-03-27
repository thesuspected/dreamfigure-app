<template>
    <div class="q-pa-md">
        <action-button label="Начальная форма" @click="goToInitialForm" />
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
</script>

<style lang="scss" scoped>
</style>
