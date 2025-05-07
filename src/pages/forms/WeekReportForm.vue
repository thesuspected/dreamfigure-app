<template>
    <div class="page q-pa-md">
        <div class="progress">
            <back-arrow-button @click="handleBackButton" />
            <q-linear-progress :value="progress" rounded size="8px" class="q-mr-sm" />
        </div>
        <div class="content">
            <!--    Текущий вес    -->
            <div v-if="step === 0" class="step">
                <h1>Сколько вы весите?</h1>
                <p>Важно! Для чистоты показателей взвешивайтесь утром натощак, желательно в нижнем белье</p>
                <scroll-picker :options="currentWeightOptions" v-model="form.currentWeight" />
            </div>
            <!--    Окружность талии    -->
            <div v-if="step === 1" class="step">
                <h1>Какая у вас окружность талии?</h1>
                <p>
                    Измерьте самую узкую часть талии, избегая втягивания живота и не пытаясь натянуть измерительную
                    ленту
                </p>
                <scroll-picker :options="waistLengthOptions" v-model="form.waistLength" />
            </div>
            <!--    Окружность шеи    -->
            <div v-if="step === 2" class="step">
                <h1>Какая у вас окружность шеи?</h1>
                <p>Измерьте обхват шеи перед зеркалом, зафиксировав результат</p>
                <scroll-picker :options="neckLengthOptions" v-model="form.neckLength" />
            </div>
            <!--    Окружность бёдер   -->
            <div v-if="step === 3" class="step">
                <h1>Какая у вас окружность бёдер?</h1>
                <p>Измерьте самую широкую часть бёдер, не пытаясь натянуть измерительную ленту</p>
                <scroll-picker :options="hipsLengthOptions" v-model="form.hipsLength" />
            </div>
            <!--    Результаты расчета    -->
            <div v-if="step === 4" class="center-block step">
                <h1>Какой у вас процент жира?</h1>
                <p>
                    Мы рассчитали ваш
                    <a
                        class="text-primary"
                        target="_blank"
                        href="https://medvisor.ru/services/navy-procent-zhira-v-tele/?ysclid=m7r6mzz8ba40847423"
                    >
                        процент жира
                    </a>
                    по формуле ВМС США
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
            </div>
        </div>
        <true-main-button :label="step !== 4 ? 'Продолжить' : 'Завершить'" @click="handleContinueButton" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue"
import "vue-scroll-picker/style.css"
import BackArrowButton from "components/buttons/BackArrowButton.vue"
import ScrollPicker from "components/form/picker/ScrollPicker.vue"
import { useRouter } from "vue-router"
import TrueMainButton from "components/buttons/TrueMainButton.vue"
import { useMiniApp } from "vue-tg/8.0"
import { api } from "boot/axios"
import { useUserStore } from "stores/user/user"
import FormInput from "components/form/input/FormInput.vue"
import {
    generateCurrentWeightOptions,
    generateNeckLength,
    generateWaistLength,
    generateHipsLength,
    calculateMaleBodyFatPercentage,
    calculateFemaleBodyFatPercentage,
} from "pages/forms/helpers"
import { storeToRefs } from "pinia"

const router = useRouter()
const step = ref(0)
const formLength = 4
const progress = computed(() => step.value / formLength)

const form = ref({
    currentWeight: 70,
    waistLength: 80,
    neckLength: 40,
    hipsLength: 80,
    calcFatPercent: undefined,
    height: 170,
    gender: "FEMALE",
})

const currentWeightOptions = generateCurrentWeightOptions()
const waistLengthOptions = generateWaistLength()
const neckLengthOptions = generateNeckLength()
const hipsLengthOptions = generateHipsLength()

const miniApp = useMiniApp()
const { tgUserId } = useUserStore()
const { user } = storeToRefs(useUserStore())

watch(
    () => user.value,
    (newUser) => {
        if (newUser) {
            form.value.height = newUser.height
            form.value.gender = newUser.gender
        }
    },
    { immediate: true }
)

const saveWeekReport = async () => {
    const body = {
        ...form.value,
        userId: tgUserId,
        timestamp: new Date().toISOString(),
    }
    await api.post("/week-reports/create", body)
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
        if (step.value === 3) {
            form.value.calcFatPercent =
                form.value.gender === "FEMALE"
                    ? calculateFemaleBodyFatPercentage(form.value)
                    : calculateMaleBodyFatPercentage(form.value)
        }
        step.value++
    } else {
        saveWeekReport()
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
