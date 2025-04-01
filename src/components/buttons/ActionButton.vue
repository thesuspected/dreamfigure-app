<template>
    <base-button class="action-btn" color="primary" :full-width="fullWidth" :label="label" :icon="icon" />
</template>

<script setup lang="ts">
import BaseButton from "components/buttons/BaseButton.vue"

defineProps({
    label: {
        type: String,
        default: undefined,
    },
    icon: {
        type: String,
        default: undefined,
    },
    fullWidth: {
        type: Boolean,
        default: true,
    },
})
</script>

<style lang="scss" scoped>
.action-btn {
    height: 52px;

    &:deep(.q-btn__content) {
        text-transform: none;
        font-weight: 500;
        font-size: 18px;
        padding-left: $sm;
    }
}
</style>
