<template>
    <div class="column q-gutter-y-sm">
        <action-button
            :color="selectedValue === firstValue ? 'primary' : 'grey-4'"
            :text-color="selectedValue === firstValue ? 'white' : 'dark'"
            @click="selectValue(firstValue)"
            :label="firstText"
        />

        <action-button
            :color="selectedValue === secondValue ? 'primary' : 'grey-4'"
            :text-color="selectedValue === secondValue ? 'white' : 'dark'"
            @click="selectValue(secondValue)"
            :label="secondText"
        />
    </div>
</template>

<script setup>
import { ref } from "vue"
import ActionButton from "../buttons/ActionButton.vue"
const emit = defineEmits(["selection"])

const props = defineProps({
    firstValue: {
        type: [String, Number],
        required: true,
    },
    secondValue: {
        type: [String, Number],
        required: true,
    },
    firstText: {
        type: String,
        default: "",
    },
    secondText: {
        type: String,
        default: "",
    },
})

const selectedValue = ref(null)

const selectValue = (value) => {
    selectedValue.value = value
    emit("selection", value)
}
</script>

<style scoped>
.q-btn {
    transition: all 0.3s ease;
}
</style>
