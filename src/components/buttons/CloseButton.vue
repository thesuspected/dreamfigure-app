<template>
    <base-button
        :class="{ 'absolute-btn-md': absolute }"
        icon="fa-solid fa-xmark"
        color="grey-light"
        text-color="dark"
        round
    />
</template>

<script setup lang="ts">
import BaseButton from "components/button/BaseButton.vue"

defineProps({
    absolute: {
        type: Boolean,
    },
})
</script>

<style lang="scss" scoped>
@import "button";
</style>
