<template>
    <span v-if="label" class="text-label">{{ label }}</span>
</template>

<script setup lang="ts">

defineProps({
    label: {
        type: String,
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
