<template>
    <div class="page q-pa-md">
        <div class="progress">
            <q-linear-progress :value="progress" />
        </div>
        <div class="content">
            <div v-if="step === 0" class="step">
                <span>Как вас зовут?</span>
                <q-input filled v-model="text" label="Ваше имя" />
            </div>
            <div v-if="step === 1" class="step">скролл<VueScrollPicker :options="options" v-model="modelValue" /></div>
        </div>
        <div class="footer">
            <q-btn v-if="step !== 0" label="Назад" color="primary" @click="step--"></q-btn>
            <q-spacer />
            <q-btn label="Далее" class="button" color="primary" @click="step++"></q-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { VueScrollPicker } from "vue-scroll-picker"
import "vue-scroll-picker/style.css"
const progress = ref(0.1)
const text = ref()
const step = ref(0)

const options = [
    { name: "Option 1", value: 1 },
    { name: "Option 2", value: 2 },
    { name: "Option 3", value: 3 },
]
const modelValue = ref(1)
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100svh;
    display: flex;
    flex-direction: column;
    .content {
        flex-grow: 1;
        display: flex;
        align-items: center;
        .step {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>
