<template>
    <div class="form-item">
        <text-label :label="label" />
        <q-input
            ref="inputRef"
            :model-value="modelValue"
            outlined
            class="form-input"
            :class="{ textarea: textarea }"
            :input-style="fontSize ? `font-size: ${fontSize}` : undefined"
            :placeholder="placeholder"
            :autogrow="autogrow"
            :mask="mask"
            :prefix="prefix"
            :suffix="suffix"
            :inputmode="inputmode"
            :hint="hint"
            :readonly="readonly"
            :disable="disabled"
            :reverse-fill-mask="reverseFillMask"
            :unmasked-value="unmaskedValue"
            @update:model-value="updateModelValue"
            @keyup="onKeyup"
            @click="handleClick"
        >
            <template v-if="customPrepend" v-slot:prepend>
                <slot name="prepend" />
            </template>
            <template v-else-if="prepend" v-slot:prepend>
                <base-icon :name="prepend" size="sm" color="input" />
            </template>
            <template v-if="customAppend" v-slot:append>
                <slot name="append" />
            </template>
            <template v-else-if="append" v-slot:append>
                <base-icon :name="append" size="xs" color="light" />
            </template>
        </q-input>
    </div>
</template>

<script setup lang="ts">
import TextLabel from "components/form/text/TextLabel.vue"
import { ref } from "vue"
import useClickOutside from "src/hooks/useClickOutside"
import { useHapticFeedback } from "vue-tg/8.0"
import BaseIcon from "components/icon/BaseIcon.vue"

const props = defineProps({
    modelValue: {
        type: [String, Number],
    },
    label: {
        type: String,
        default: undefined,
    },
    placeholder: {
        type: String,
    },
    autogrow: {
        type: Boolean,
    },
    textarea: {
        type: Boolean,
    },
    customPrepend: {
        type: Boolean,
    },
    prepend: {
        type: String,
    },
    customAppend: {
        type: Boolean,
    },
    append: {
        type: String,
    },
    mask: {
        type: String,
    },
    reverseFillMask: {
        type: Boolean,
    },
    unmaskedValue: {
        type: Boolean,
    },
    prefix: {
        type: String,
    },
    suffix: {
        type: String,
    },
    inputmode: {
        type: String,
    },
    fontSize: {
        type: String,
    },
    hint: {
        type: String,
    },
    number: {
        type: Boolean,
    },
    maxValue: {
        type: Number,
    },
    readonly: {
        type: Boolean,
    },
    disabled: {
        type: Boolean,
    },
})
const emit = defineEmits(["update:model-value", "enter"])
const inputRef = ref()

const updateModelValue = (value?: string) => {
    if (props.number && value) {
        let numberValue = Number(value.replace(/\D/g, ""))
        if (props.maxValue && numberValue > props.maxValue) {
            numberValue = props.maxValue
        }
        emit("update:model-value", numberValue)
        return
    }
    emit("update:model-value", !!value ? value : undefined)
}

const blurInputRef = () => {
    inputRef.value.blur()
}

const focusInputRef = () => {
    inputRef.value.focus()
}

const onKeyup = (event: KeyboardEvent) => {
    const { key } = event
    if (key === "Enter") {
        blurInputRef()
        emit("enter")
    }
}

const { impactOccurred } = useHapticFeedback()
const handleClick = () => {
    impactOccurred("light")
}

useClickOutside({ elRef: inputRef, callback: blurInputRef })
defineExpose({ inputRef, focusInputRef })

</script>

<style lang="scss" scoped>
.form-item {
    .form-label {
        display: flex;
        font-size: 16px;
        font-weight: 600;
        line-height: 1rem;
        padding-bottom: $sm;
    }

    .form-input {
        padding-bottom: 15px;

        &.textarea {
            &:deep(.q-field__control) {
                min-height: 90px;
            }
        }

        &:deep(.q-field__control) {
            border-radius: $smh;
            background: $lighter;
            font-size: 16px;

            &:before {
                border: none;
            }
        }
    }
}
</style>
