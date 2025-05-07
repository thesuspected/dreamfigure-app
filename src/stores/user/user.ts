import { defineStore } from "pinia"
import { computed, nextTick, ref } from "vue"
import { TgInitData, TgUserStoreType } from "src/stores/user/types"
import { useMiniApp } from "vue-tg"
import { LocalStorage } from "quasar"
import { api } from "boot/axios"
import type { UserInfoType } from "./types"

export enum UserStoreEnum {
    USER_STORE = "USER_STORE",
    USER_LOCAL_STORE = "USER_LOCAL_STORE",
}

export const useUserStore = defineStore(UserStoreEnum.USER_STORE, () => {
    const { initData } = useMiniApp()
    const tgUserData = ref<TgUserStoreType>()
    const tgUserId = computed(() => tgUserData.value?.initData.user.id)

    const user = ref<UserInfoType>()
    const isAdmin = ref(false)

    const loadUserInitData = () => {
        if (initData.includes("user")) {
            const urlParams = Object.fromEntries(new URLSearchParams(initData))
            const initDataObject = {
                ...urlParams,
                user: JSON.parse(urlParams.user),
            } as TgInitData
            tgUserData.value = { initData: initDataObject }
            setLocalStorage()
        } else {
            getLocalStorage()
        }
    }

    const getLocalStorage = () => {
        const local: TgUserStoreType | null = LocalStorage.getItem(UserStoreEnum.USER_LOCAL_STORE)
        if (local) {
            tgUserData.value = local
        }
    }

    const setLocalStorage = () => {
        if (tgUserData.value) {
            LocalStorage.set(UserStoreEnum.USER_LOCAL_STORE, tgUserData.value)
        }
    }

    const validateUser = async () => {
        await nextTick()
        if (tgUserData.value?.initData) {
            const validateData = await api.post("/users/validate", tgUserData.value.initData)
            if (validateData) {
                // isAdmin.value = validateData.data.isAdmin
            }
        }
    }

    const fetchUserInfo = async () => {
        if (!tgUserId.value) return
        try {
            const response = await api.get<UserInfoType>(`/users/${tgUserId.value}`)
            user.value = response.data
        } catch (error) {
            console.error("Ошибка при получении данных пользователя:", error)
        }
    }

    return {
        tgUserData,
        isAdmin,
        loadUserInitData,
        validateUser,
        tgUserId,
        user,
        fetchUserInfo,
    }
})
