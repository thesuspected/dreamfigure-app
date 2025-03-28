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
            <div v-if="step === 2" class="step">
                <h1>Сколько вам лет?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="ageOptions" v-model="form.age" />
            </div>
            <!--    Пол    -->
            <div v-if="step === 3" class="step">
                <h1>Выберите ваш пол</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <ButtonGroup
                    :first-value="1"
                    :second-value="2"
                    first-text="Мужской"
                    second-text="Женский"
                    @selection="handleSelection"
                />
            </div>
            <!--    Рост    -->
            <div v-if="step === 4" class="step">
                <h1>Какой у вас рост?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="heightOptions" v-model="form.height" />
            </div>

            <!--    Вес изначальный    -->
            <div v-if="step === 5" class="step">
                <h1>Какой у вас сейчас вес?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="initialWeightOptions" v-model="form.initialWeight" />
            </div>
            <!--    Вес желаемый    -->
            <div v-if="step === 6" class="step">
                <h1>Какой у вас желаемый вес?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="currentWeightOptions" v-model="form.currentWeight" />
            </div>
            <!--    Окружность талии    -->
            <div v-if="step === 7" class="step">
                <h1>Какая у вас окружность талии?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="waistLengthOptions" v-model="form.waistLength" />
            </div>
            <!--    Окружность шеи    -->
            <div v-if="step === 8" class="step">
                <h1>Какая у вас окружность шеи?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="neckLengthOptions" v-model="form.neckLength" />
            </div>

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
import {
    generateAgeOptions,
    generateCurrentWeightOptions,
    generateHeightOptions,
    generateInitialWeightOptions,
    generateNeckLength,
    generateWaistLength,
} from "pages/forms/const"
import ScrollPicker from "components/form/input/ScrollPicker.vue"
import { useRouter } from "vue-router"
import ButtonGroup from "src/components/groups/ButtonGroup.vue"

const router = useRouter()

const step = ref(3)
const progress = computed(() => step.value / formLength)

const form = ref({
    callName: undefined,
    age: 29,
    height: 170,
    initialWeight: 70,
    currentWeight: 55,
    waistLength: 70,
    neckLength: 50,
})
const formLength = Object.values(form.value).length
const ageOptions = generateAgeOptions()
const heightOptions = generateHeightOptions()
const initialWeightOptions = generateInitialWeightOptions()
const currentWeightOptions = generateCurrentWeightOptions()
const waistLengthOptions = generateWaistLength()
const neckLengthOptions = generateNeckLength()

const handleBackButton = () => {
    if (step.value > 0) {
        step.value--
    } else {
        router.push("/")
    }
}
const handleContinueButton = () => {
    if (step.value < formLength) {
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
