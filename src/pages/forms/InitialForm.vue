<template>
    <div class="page q-pa-md">
        <div class="progress">
            <back-arrow-button @click="handleBackButton" />
            <q-linear-progress :value="progress" rounded size="8px" class="q-mr-sm" />
        </div>
        <div class="content">
            <!--    Начальный экран    -->
            <div v-if="step === 0" class="center-block step">
                <h1>Добро пожаловать!</h1>
                <p>Пожалуйста, заполните анкету, а мы составим для вас индивидуальный план похудения</p>
            </div>
            <!--    Имя    -->
            <div v-if="step === 1" class="step">
                <h1>Как вас зовут?</h1>
                <p>Это поможет создать персональный план для вас</p>
                <form-input v-model="form.callName" placeholder="Введите Имя" @enter="handleContinueButton" />
            </div>
            <!--    Дата рождения    -->
            <div v-if="step === 2" class="step">
                <h1>Укажите дату рождения</h1>
                <p>Это поможет создать персональный план для вас</p>
                <date-scroll-picker
                    v-model:day="form.birthDate.day"
                    v-model:month="form.birthDate.month"
                    v-model:year="form.birthDate.year"
                />
            </div>
            <!--    Пол    -->
            <div v-if="step === 3" class="step">
                <h1>Выберите ваш пол</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <ColumnButtonGroup v-model="form.gender" :options="genderOptions" />
            </div>
            <!--    Рост    -->
            <div v-if="step === 4" class="step">
                <h1>Какой у вас рост?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="heightOptions" v-model="form.height" />
            </div>

            <!--    Вес изначальный    -->
            <div v-if="step === 5" class="step">
                <h1>Какой у вас вес?</h1>
                <p>Эти данные помогут сделать план более персональным</p>
                <scroll-picker :options="initialWeightOptions" v-model="form.initialWeight" />
            </div>
            <!--    Вес желаемый    -->
            <div v-if="step === 6" class="step">
                <h1>Сколько вы хотели бы весить?</h1>
                <p>С помощью этих данных мы сможем отслеживать ваш прогресс</p>
                <scroll-picker :options="currentWeightOptions" v-model="form.currentWeight" />
            </div>
            <!--    Окружность талии    -->
            <div v-if="step === 7" class="step">
                <h1>Какая у вас окружность талии?</h1>
                <p>Эти данные необходимы для расчета ваших показателей</p>
                <scroll-picker :options="waistLengthOptions" v-model="form.waistLength" />
            </div>
            <!--    Окружность шеи    -->
            <div v-if="step === 8" class="step">
                <h1>Какая у вас окружность шеи?</h1>
                <p>Эти данные необходимы для расчета ваших показателей</p>
                <scroll-picker :options="neckLengthOptions" v-model="form.neckLength" />
            </div>
            <!--    Окружность бёдер   -->
            <div v-if="step === 9" class="step">
                <h1>Какая у вас окружность бёдер?</h1>
                <p>Эти данные необходимы для расчета ваших показателей</p>
                <scroll-picker :options="hipsLengthOptions" v-model="form.hipsLength" />
            </div>
            <!--    Калькулятор: Процент жира и идеальный вес    -->
            <div v-if="step === 10" class="center-block step">
                <h1>Почти готово!</h1>
                <p>
                    Мы рассчитали ваш
                    <a
                        class="text-primary"
                        target="_blank"
                        href="https://medvisor.ru/services/navy-procent-zhira-v-tele/?ysclid=m7r6mzz8ba40847423"
                    >
                        процент жира
                    </a>
                    , а также
                    <a
                        class="text-primary"
                        target="_blank"
                        href="https://institut-immunologii.ru/ozhir/imt.php"
                    >
                        идеальный вес
                    </a>
                    , формулы представлены по ссылкам
                </p>
                <form-input
                    v-model="form.calcFatPercent"
                    class="q-mt-lg"
                    inputmode="numeric"
                    label="Процент жира"
                    placeholder="0 %"
                    mask="##.## %"
                    hint="Если вы используете умные весы, заполните это поле своим значением"
                    fill-mask
                    unmasked-value
                />
                <form-input
                    v-model="form.calcIdealWeight"
                    class="q-mt-xl"
                    inputmode="numeric"
                    label="Идеальный вес"
                    readonly
                    placeholder="0 кг"
                    mask="## кг"
                    hint="Значение рассчитывается по росту и не отражает вашу индивидуальность"
                    fill-mask
                    unmasked-value
                />
            </div>
        </div>
        <true-main-button :label="step !== 10 ? 'Продолжить' : 'Завершить' " @click="handleContinueButton" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import "vue-scroll-picker/style.css"
import BackArrowButton from "components/buttons/BackArrowButton.vue"
import FormInput from "components/form/input/FormInput.vue"
import {
    generateCurrentWeightOptions,
    generateHeightOptions,
    generateInitialWeightOptions,
    generateNeckLength,
    generateWaistLength,
    generateHipsLength,
    calculateMaleBodyFatPercentage,
    calculateFemaleBodyFatPercentage, calculateIdealWeight,
} from "pages/forms/helpers"
import ScrollPicker from "components/form/picker/ScrollPicker.vue"
import { useRouter } from "vue-router"
import ColumnButtonGroup from "src/components/groups/ColumnButtonGroup.vue"
import { InitialFormType } from "./types"
import DateScrollPicker from "components/form/picker/DateScrollPicker.vue"
import dayjs from "dayjs"
import TrueMainButton from "components/buttons/TrueMainButton.vue"
import { useMiniApp } from "vue-tg/8.0"
import { api } from "boot/axios"

const router = useRouter()

const step = ref(0)
const progress = computed(() => step.value / formLength)

const form = ref<InitialFormType>({
    callName: undefined,
    gender: "FEMALE",
    birthDate: {
        day: 15,
        month: 5,
        year: 1980,
    },
    age: undefined,
    height: 170,
    initialWeight: 70,
    currentWeight: 60,
    waistLength: 80,
    neckLength: 40,
    hipsLength: 80,
    calcFatPercent: undefined,
    calcIdealWeight: undefined,
})
const formLength = 10
const heightOptions = generateHeightOptions()
const initialWeightOptions = generateInitialWeightOptions()
const currentWeightOptions = generateCurrentWeightOptions()
const waistLengthOptions = generateWaistLength()
const neckLengthOptions = generateNeckLength()
const hipsLengthOptions = generateHipsLength()
const genderOptions = [
    {
        label: "Мужской",
        value: "MALE",
        icon: "fa-solid fa-mars",
    },
    {
        label: "Женский",
        value: "FEMALE",
        icon: "fa-solid fa-venus",
    },
]

const miniApp = useMiniApp()
const saveInitialForm = async () => {
    const { birthDate } = form.value
    const body = {
        ...form.value,
        userId: 471839772,
        birthDate: `${birthDate.year}-${birthDate.month}-${birthDate.day}`,
    }
    await api.post("/users/initial", body)
    miniApp.close()
}

const handleBackButton = () => {
    if (step.value > 0) {
        step.value--
    } else {
        router.push("/")
    }
}
const handleContinueButton = () => {
    if (step.value < formLength) {
        if (step.value === 2) {
            form.value.age = dayjs().year() - form.value.birthDate.year
        }
        if (step.value === 9) {
            form.value.calcFatPercent =
                form.value.gender === "FEMALE"
                    ? calculateFemaleBodyFatPercentage(form.value)
                    : calculateMaleBodyFatPercentage(form.value)
            form.value.calcIdealWeight = calculateIdealWeight(form.value)
        }
        step.value++
    } else {
        saveInitialForm()
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

        .center-block {
            height: 60svh;
            justify-content: center;
            text-align: center;
        }
    }
}
</style>
