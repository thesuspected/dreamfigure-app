<template>
    <div class="layout">
        <slot />
        <q-tabs
            v-if="isTabsVisible"
            v-model="activeTab"
            class="bottom-layout"
            align="justify"
            narrow-indicator
            @update:model-value="onTabChange"
        >
            <q-tab :name="RouteNames.USER_HOME" icon="fa-solid fa-house" label="Главная" />
            <q-tab :name="RouteNames.USER_STATS" icon="fa-solid fa-chart-column" label="Показатели" />
            <q-tab :name="RouteNames.USER_SETTINGS" icon="fa-solid fa-gear" label="Настройки" />
        </q-tabs>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { RouteNames } from "src/router/routes"

const route = useRoute()
const router = useRouter()

const activeTab = ref()

const routesWithTabs = [RouteNames.USER_HOME, RouteNames.USER_STATS, RouteNames.USER_SETTINGS]
const isTabsVisible = computed(() => routesWithTabs.includes(route.name as RouteNames))

const onTabChange = (tabName: string) => {
    router.push(tabName)
}

onMounted(() => {
    activeTab.value = route.path
})
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
}

.bottom-layout {
    position: fixed;
    background: white;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding-bottom: var(--tg-safe-area-inset-bottom, 0px);

    .q-tab {
        text-transform: none;
    }
}
</style>
