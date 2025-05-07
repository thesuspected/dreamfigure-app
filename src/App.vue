<template>
    <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue"
import { useHapticFeedback, useMainButton, useMiniApp, useTheme, useViewport } from "vue-tg/8.0"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import updateLocale from "dayjs/plugin/updateLocale"
import "dayjs/locale/ru"
import { useUserStore } from "stores/user/user"

const miniApp = useMiniApp()
const viewport = useViewport()
const theme = useTheme()
const mainButton = useMainButton()
const { impactOccurred } = useHapticFeedback()
mainButton.onClick(() => {
    impactOccurred("medium")
})
miniApp.ready()
theme.headerColor.value = "#ffffff"
theme.backgroundColor.value = "#ffffff"
theme.bottomBarColor.value = "#ffffff"

dayjs.locale("ru")
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale("ru", {
    calendar: {
        lastDay: "[Вчера в] h:mm",
        sameDay: "[Сегодня в] h:mm",
        nextDay: "[Завтра в] h:mm",
        lastWeek: "[Предыдущий] dddd [в] h:mm",
        nextWeek: "dddd [в] h:mm",
        sameElse: "DD.MM.YYYY",
    },
})

const userStore = useUserStore()

onBeforeMount(() => {
    userStore.loadUserInitData()
})

onMounted(async () => {
    await userStore.fetchUserInfo()
    viewport.expand()
    viewport.isVerticalSwipesEnabled.value = false
    miniApp.isClosingConfirmationEnabled.value = true
})
</script>
