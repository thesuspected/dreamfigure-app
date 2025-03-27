<template>
    <div class="page q-pa-md">
        <div class="progress">
            <back-arrow-button @click="handleBackButton" />
            <q-linear-progress :value="progress" rounded size="8px" class="q-mr-sm" />
        </div>
        <div class="content">
            <!--    Начальный экран    -->
            <div v-if="step === 0" class="hello-block step">
                <h1>Добро пожаловать!</h1>
                <p>Пожалуйста, заполните анкету, а мы составим для вас индивидуальный план похудения</p>
            </div>
            <!--    Имя    -->
            <div v-if="step === 1" class="step">
                <h1>Как вас зовут?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <form-input v-model="form.callName" placeholder="Введите Имя" @enter="handleContinueButton" />
            </div>
            <!--    Дата рождения    -->
            <!--    Пол    -->
            <!--    Рост    -->
            <div v-if="step === 2" class="step">
                <h1>Какой у вас рост?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="heightOptions" v-model="form.height" />
            </div>
            <!--    Рост    -->
            <!--    Вес изначальный    -->
            <!--    Вес желаемый    -->
            <!--    Окружность талии    -->
            <!--    Окружность шеи    -->
            <!--    Калькулятор: Процент жира    -->
            <!--    Калькулятор: Идеальный вес    -->
        </div>
        <MainButton text="Продолжить" @click="handleContinueButton" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import "vue-scroll-picker/style.css"
import BackArrowButton from "components/buttons/BackArrowButton.vue"
import FormInput from "components/form/input/FormInput.vue"
import { MainButton } from "vue-tg"
import { generateHeightOptions } from "pages/forms/const"
import ScrollPicker from "components/form/input/ScrollPicker.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const step = ref(0)
const progress = computed(() => step.value / formLength)

const form = ref({
    callName: undefined,
    height: 170,
    birthDate: undefined,
})
const formLength = Object.values(form.value).length
const heightOptions = generateHeightOptions()

const handleBackButton = () => {
    if (step.value > 0) {
        step.value--
    } else {
        router.push("/")
    }
}
const handleContinueButton = () => {
    if (step.value + 1 < formLength) {
        step.value++
    } else {
        router.push("/")
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;

    .progress {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .content {
        display: flex;
        padding-top: 40px;

        .step {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .hello-block {
            height: 60svh;
            justify-content: center;
            text-align: center;
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
