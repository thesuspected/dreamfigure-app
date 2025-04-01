<template>
    <text-label :label="label" />
    <div class="group">
        <div
            v-for="(item, key) in options"
            :key="key"
            class="select"
            :class="{ selected: item.value === modelValue }"
            @click="handleSelect(item)"
        >
            <span class="emoji">{{ item.emoji }}</span>
            <span class="label">{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { useHapticFeedback } from "vue-tg/8.0"
import { OptionsType } from "components/form/input/types"
import TextLabel from "components/form/text/TextLabel.vue"

defineProps({
    modelValue: {
        type: String,
    },
    options: {
        type: Array as PropType<OptionsType[]>,
        default: () => [],
    },
    label: {
        type: String,
    },
})
const emit = defineEmits(["update:model-value"])

const { impactOccurred } = useHapticFeedback()

const handleSelect = (item: OptionsType) => {
    impactOccurred("medium")
    emit("update:model-value", item.value)
}
</script>

<style lang="scss" scoped>
.group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .select {
        border-radius: $smh;
        //border: 2px solid $light;
        transition-duration: 0.1s;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 $md;
        height: 56px;
        background: $lighter;

        &.selected {
            box-shadow: inset 0 0 0 2px $primary;
        }

        .emoji {
            margin-right: 8px;
            font-size: 20px;
        }

        .label {
            font-weight: 500;
            color: $dark;
        }

        .day-of-week {
            color: $gray;
        }
    }
}
</style>
