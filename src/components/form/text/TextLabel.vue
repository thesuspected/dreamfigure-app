<template>
    <span v-if="label" class="text-label">{{ label }}</span>
</template>

<script setup lang="ts">
import { PropType } from "vue"

defineProps({
    label: {
        type: String as PropType<string | undefined>,
        default: undefined,
    },
})
</script>

<style lang="scss" scoped>
.text-label {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    line-height: 1rem;
    padding-bottom: $sm;
    padding-left: $xs;
    color: $sub;
}
</style>
