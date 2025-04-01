<template>
    <VueScrollPicker
        :model-value="modelValue"
        :options="localeOptions"
        :drag-sensitivity="0.6"
        :touch-sensitivity="0.6"
        :wheel-sensitivity="0.8"
        class="scroll-picker"
        @update:model-value="updateModelValue"
        @move="handleMove"
    />
</template>

<script lang="ts" setup>
import { VueScrollPicker } from "vue-scroll-picker"
import { computed, PropType, ref } from "vue"
import { OptionsType } from "components/form/input/types"
import { useHapticFeedback } from "vue-tg/8.0"

const props = defineProps({
    modelValue: {
        type: [String, Number] as PropType<string | number | undefined>,
    },
    options: {
        type: Array as PropType<OptionsType[]>,
    },
})

const emit = defineEmits(["update:model-value"])
const { impactOccurred } = useHapticFeedback()
const localeOptions = computed(() => props.options?.map((item) => ({ name: item.label, value: item.value })))
const updateModelValue = (value?: string) => {
    emit("update:model-value", value)
}
const lastMoveValue = ref()
const handleMove = (value: number) => {
    if (value !== lastMoveValue.value) {
        impactOccurred("light")
        lastMoveValue.value = value
    }
}
</script>

<style lang="scss" scoped>
.scroll-picker {
    font-size: 24px;
    height: 12em;

    &:deep(.vue-scroll-picker-item) {
        line-height: 1.5;
    }

    &:deep(.vue-scroll-picker-layer) {
        .vue-scroll-picker-layer-top {
            border-bottom: none;
        }

        .vue-scroll-picker-layer-selection {
            border-radius: $smh;
            background: $gray;
            opacity: 0.15;
        }

        .vue-scroll-picker-layer-bottom {
            border-top: none;
        }
    }
}
</style>