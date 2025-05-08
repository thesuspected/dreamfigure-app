<template>
    <div class="page q-pa-md">
        <main-tab-charts />
    </div>
</template>

<script setup lang="ts">
import MainTabCharts from "components/charts/MainTabCharts.vue"
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 60px;
}
</style>
