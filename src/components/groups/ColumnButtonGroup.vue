<template>
    <div class="column q-gutter-y-sm">
        <action-button
            v-for="(item, key) in options"
            :key="key"
            :color="modelValue === item.value ? 'primary' : 'grey-4'"
            :text-color="modelValue === item.value ? 'white' : 'dark'"
            :icon="item.icon"
            :label="item.label"
            @click="handleClick(item)"
        />
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import ActionButton from "../buttons/ActionButton.vue"
import { OptionsType } from "components/form/input/types.js"

const emit = defineEmits(["update:model-value"])

defineProps({
    modelValue: {
        type: String,
    },
    options: {
        type: Array as PropType<OptionsType[]>,
    },
})

const handleClick = (item: OptionsType) => {
    emit("update:model-value", item.value)
}
</script>

<style scoped>
</style>
