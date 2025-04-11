<template>
    <div class="page q-pa-md">
        <div class="progress">
            <back-arrow-button @click="handleBackButton" />
            <q-linear-progress :value="progress" rounded size="8px" class="q-mr-sm" />
        </div>
        <div class="content">
            <!--    Время подъема    -->
            <div v-if="step === 0" class="hello-block step">
                <h1>Во сколько вы проснулись?</h1>
                <time-scroll-picker v-model:hour="form.riseTime.hour" v-model:minute="form.riseTime.minute" />
            </div>
            <!--    Время отбоя    -->
            <div v-if="step === 1" class="step">
                <h1>Во сколько легли спать?</h1>
                <time-scroll-picker v-model:hour="form.sleepTime.hour" v-model:minute="form.sleepTime.minute" />
            </div>
            <!--    Физическое состояние    -->
            <div v-if="step === 2" class="step">
                <h1>Как вы себя чувствуете?</h1>
                <p>Оцените ваше физическое состояние</p>
                <row-select-group v-model="form.physicalState" :options="physicalOptions" />
            </div>
            <!--    Эмоциональное состояние    -->
            <div v-if="step === 3" class="step">
                <h1>Какое у вас настроение?</h1>
                <p>Оцените ваше эмоциональное состояние</p>
                <row-select-group v-model="form.emotionalState" :options="emotionalOptions" />
            </div>
            <!--    Кол-во воды    -->
            <div v-if="step === 4" class="step">
                <h1>Сколько воды вы выпили?</h1>
                <p>В стакане воды содержится ~200 мл</p>
                <scroll-picker :options="waterOptions" v-model="form.waterAmount" />
                <q-img src="/glass.png" class="glass-img">
                    <h1>{{ getGlassCount }}</h1>
                </q-img>
            </div>
            <!--    Активность шаги    -->
            <div v-if="step === 5" class="step">
                <h1>Сколько шагов сделали?</h1>
                <form-input
                    v-model="form.activitySteps"
                    placeholder="Введите число"
                    inputmode="numeric"
                    @enter="handleContinueButton"
                />
            </div>
            <!--    Активность тип    -->
            <div v-if="step === 6" class="step">
                <h1>Какая у вас была активность?</h1>
                <p>Выберите одну из активностей, если ничего не подходит, нажмите "Другое" и напишите свой вариант в
                    поле ниже</p>
                <row-select-group v-model="form.activityTypes" :options="activityTypeOptions" />
                <form-input
                    v-if="form.activityTypes === 'another'"
                    v-model="form.activityText"
                    class="q-mt-md"
                    label="Активность"
                    placeholder="Введите название"
                />
            </div>
        </div>
        <true-main-button :label="step !== 6 ? 'Продолжить' : 'Сохранить' " @click="handleContinueButton" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import "vue-scroll-picker/style.css"
import BackArrowButton from "components/buttons/BackArrowButton.vue"
import FormInput from "components/form/input/FormInput.vue"
import {
    generateWaterOptions,
    getActivityTypeOptions,
    getEmotionalOptions,
    getPhysicalOptions,
} from "pages/forms/helpers"
import ScrollPicker from "components/form/picker/ScrollPicker.vue"
import { useRouter } from "vue-router"
import { DailyReportFormType } from "./types"
import TrueMainButton from "components/buttons/TrueMainButton.vue"
import TimeScrollPicker from "components/form/picker/TimeScrollPicker.vue"
import RowSelectGroup from "components/groups/RowSelectGroup.vue"
import { useMiniApp } from "vue-tg/8.0"
import { api } from "boot/axios"
import dayjs from "dayjs"
import { useUserStore } from "stores/user/user"

const router = useRouter()

const step = ref(0)
const progress = computed(() => step.value / formLength)

const form = ref<DailyReportFormType>({
    riseTime: {
        hour: "08",
        minute: "00",
    },
    sleepTime: {
        hour: "22",
        minute: "00",
    },
    physicalState: undefined,
    emotionalState: undefined,
    waterAmount: 1000,
    activitySteps: undefined,
    activityTypes: undefined,
    activityText: null,
})
const formLength = 6
const waterOptions = generateWaterOptions()
const physicalOptions = getPhysicalOptions()
const emotionalOptions = getEmotionalOptions()
const getGlassCount = computed(() => form.value.waterAmount / 200)
const activityTypeOptions = getActivityTypeOptions()
const miniApp = useMiniApp()
const { getTgUserId } = useUserStore()

const saveReport = async () => {
    const { riseTime, sleepTime, activitySteps } = form.value
    const body = {
        ...form.value,
        userId: getTgUserId,
        date: dayjs().format("YYYY-MM-DD"),
        activitySteps: Number(activitySteps),
        riseTime: `${riseTime.hour}:${riseTime.minute}`,
        sleepTime: `${sleepTime.hour}:${sleepTime.minute}`,
    }
    await api.post("/reports/create", body)
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
        step.value++
    } else {
        saveReport()
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

            .glass-img {
                width: 100px;
                align-self: center;
                margin-top: 40px;
                border-bottom: 3px solid $light;

                h1 {
                    text-align: center;
                    margin-top: 30px;
                    color: $primary;
                }
            }
        }

        .center-block {
            height: 60svh;
            justify-content: center;
            text-align: center;
        }
    }
}
</style>
