<template>
    <q-icon :name="name" :color="color" :size="size" />
</template>

<script setup lang="ts">
defineProps({
    size: {
        type: String,
        default: "md",
    },
    name: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "dark",
    },
})
</script>

<style lang="scss" scoped></style>
