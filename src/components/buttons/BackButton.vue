<template>
    <base-button
        :class="{ 'absolute-btn-md': absolute }"
        icon="fa-solid fa-arrow-left"
        color="transparent"
        text-color="dark"
        round
    />
</template>

<script setup lang="ts">
import BaseButton from "components/buttons/BaseButton.vue"

defineProps({
    absolute: {
        type: Boolean,
    },
})
</script>

<style lang="scss" scoped>
@import "button";
</style>
