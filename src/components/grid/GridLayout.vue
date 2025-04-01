<template>
    <div
        class="grid-layout"
        :style="{
            gap: gap,
            'grid-template-columns': columns,
            'grid-template-rows': rows,
        }"
    >
        <slot name="default" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    columns: {
        type: String,
        default: '1fr 1fr',
    },
    rows: {
        type: String,
        default: '1fr',
    },
    gap: {
        type: String,
        default: '0.5rem',
    },
})
</script>

<style lang="scss" scoped>
.grid-layout {
    display: grid;
    width: 100%;
}
</style>
