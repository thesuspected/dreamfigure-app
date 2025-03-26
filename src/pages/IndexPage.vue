<template>
    <div class="page q-pa-md">
        <div class="progress">
            <m-back-button @click="step--"/>
            <q-linear-progress :value="progress" rounded size="8px" class="q-mr-sm"/>
        </div>
        <div class="content">
            <div v-if="step === 0" class="step">
                <form-input v-model="text" placeholder="Ваше Имя"/>
            </div>
            <div v-if="step === 1" class="step">
                скролл
                <VueScrollPicker :options="options" v-model="modelValue"/>
            </div>
        </div>
        <div class="footer q-pa-md">
            <action-button label="Продолжить" @click="step++"/>
        </div>
        <BackButton/>
        <MainButton text="Продолжить"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { VueScrollPicker } from "vue-scroll-picker"
import "vue-scroll-picker/style.css"
import MBackButton from "components/buttons/BackButton.vue"
import ActionButton from "components/buttons/ActionButton.vue"
import FormInput from "components/form/input/FormInput.vue"
import { MainButton, BackButton } from "vue-tg";

const progress = ref(0.1)
const text = ref()
const step = ref(0)

const options = [
    {name: "Option 1", value: 1},
    {name: "Option 2", value: 2},
    {name: "Option 3", value: 3},
]
const modelValue = ref(1)
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100svh;
    display: flex;
    flex-direction: column;

    .progress {
        display: flex;
        align-items: center;
        gap: 16px;
    }

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
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>
