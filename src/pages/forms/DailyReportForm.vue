<template>
    <div class="page q-pa-md">
        <time-scroll-picker
            v-model:hour="form.riseTime.hour"
            v-model:minute="form.riseTime.minute"
        />
        <date-scroll-picker
            v-model:day="form.birthDate.day"
            v-model:month="form.birthDate.month"
            v-model:year="form.birthDate.year"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import TimeScrollPicker from "components/form/picker/TimeScrollPicker.vue"
import DateScrollPicker from "components/form/picker/DateScrollPicker.vue"

const form = ref({
    riseTime: {
        hour: "08",
        minute: "00",
    },
    birthDate: {
        day: 15,
        month: 5,
        year: 1980,
    },
})
</script>

<style lang="scss" scoped>
</style>