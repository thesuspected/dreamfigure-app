<template>
    <MainButton v-if="isPlatformTelegram" :text="label" />
    <ActionButton v-else class="absolute-main-button" :full-width="false" :label="label" />
</template>

<script lang="ts" setup>
import { MainButton } from "vue-tg"
import { useTheme } from "vue-tg/8.0"
import { computed } from "vue"
import { isEmpty } from "lodash"
import ActionButton from "components/buttons/ActionButton.vue"

defineProps({
    label: {
        type: String,
    },
})

const theme = useTheme()
const isPlatformTelegram = computed(() => !isEmpty(theme.themeParams.value))
</script>

<style lang="scss" scoped>
.absolute-main-button {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
}
</style>