<template>
    <q-btn
        unelevated
        class="base-button all-pointer-events"
        :size="size"
        :class="{
            'text-strike': lineThrough,
            'full-width': fullWidth,
            capitalize: capitalize,
        }"
        :color="color"
        :text-color="textColor"
        :label="label"
        :icon="icon"
        :flat="flat"
        :icon-right="iconRight"
        :padding="padding"
        :round="round"
        :disable="disable"
        :loading="loading"
        @click="handleClickButton"
    >
        <slot />
    </q-btn>
</template>

<script setup lang="ts">
import { useHapticFeedback } from "vue-tg/8.0"
import { type PropType } from "vue"

const props = defineProps({
    label: {
        type: String as PropType<string | undefined>,
        default: undefined,
    },
    color: {
        type: String,
        default: "primary",
    },
    textColor: {
        type: String,
    },
    icon: {
        type: String as PropType<string | undefined>,
    },
    iconRight: {
        type: String,
    },
    padding: {
        type: String,
    },
    size: {
        type: String,
        default: "md",
    },
    round: {
        type: Boolean,
    },
    disable: {
        type: Boolean,
    },
    loading: {
        type: Boolean,
    },
    lineThrough: {
        type: Boolean,
    },
    fullWidth: {
        type: Boolean,
    },
    flat: {
        type: Boolean,
    },
    capitalize: {
        type: Boolean,
        default: true,
    },
    defaultHaptic: {
        type: Boolean,
        default: true,
    },
    hapticValue: {
        type: String as PropType<"light" | "medium" | "heavy" | "rigid" | "soft">,
        default: "medium",
    },
})
const { impactOccurred } = useHapticFeedback()

const handleClickButton = () => {
    if (props.defaultHaptic) {
        impactOccurred(props.hapticValue)
    }
}
</script>

<style lang="scss" scoped>
.base-button {
    border-radius: $smh;

    &.capitalize {
        text-transform: capitalize;
    }

    &:deep(.q-icon) {
        font-size: 1.515em;
    }
}
</style>
