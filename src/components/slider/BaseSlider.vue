<template>
    <div class="swiper-container">
        <swiper
            :slidesPerView="slides"
            :spaceBetween="space"
            :pagination="{
                clickable: true,
            }"
            :autoplay="{
                delay: autoplayDelay,
                disableOnInteraction: true,
            }"
            :modules="modules"
            class="base-swiper"
            :class="{ 'auto-width': slides === 'auto' }"
        >
            <slot />
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import { onBeforeMount, PropType, ref } from 'vue'
import { SwiperModule } from 'swiper/types'

const props = defineProps({
    slides: {
        type: [Number, String] as PropType<number | 'auto'>,
        default: 1,
    },
    space: {
        type: Number,
        default: 20,
    },
    pagination: {
        type: Boolean,
        default: false,
    },
    autoplay: {
        type: Boolean,
        default: false,
    },
    autoplayDelay: {
        type: Number,
        default: 2500,
    },
})

const modules = ref<SwiperModule[]>([])

onBeforeMount(() => {
    if (props.pagination) {
        modules.value.push(Pagination)
    }
    if (props.autoplay) {
        modules.value.push(Autoplay)
    }
})
</script>

<style lang="scss" scoped>
.auto-width {
    &:deep(.swiper-slide) {
        width: auto !important;
    }
}
.swiper-container {
    margin-left: -1.25rem;
    margin-right: -1.25rem;

    .base-swiper {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        &:deep(.swiper-pagination-bullet-active) {
            background: $primary;
        }
    }
}
</style>
