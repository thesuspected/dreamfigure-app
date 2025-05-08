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
    USER_INIT_DATA_STRING = "USER_INIT_DATA_STRING",
}

export const useUserStore = defineStore(UserStoreEnum.USER_STORE, () => {
    const { initData } = useMiniApp()
    const tgUserData = ref<TgUserStoreType>()
    const tgUserDataString = ref<string>()
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
            tgUserDataString.value = initData
            setLocalStorage()
        } else {
            getLocalStorage()
        }
        console.log(tgUserData.value)
    }

    const getLocalStorage = () => {
        const local: TgUserStoreType | null = LocalStorage.getItem(UserStoreEnum.USER_LOCAL_STORE)
        if (local) {
            tgUserData.value = local
        }
        const initDataString: string | null = LocalStorage.getItem(UserStoreEnum.USER_INIT_DATA_STRING)
        if (initDataString) {
            tgUserDataString.value = initDataString
        }
    }

    const setLocalStorage = () => {
        if (tgUserData.value) {
            LocalStorage.set(UserStoreEnum.USER_LOCAL_STORE, tgUserData.value)
        }
        if (initData) {
            LocalStorage.set(UserStoreEnum.USER_INIT_DATA_STRING, initData)
        }
    }

    const validateUser = async () => {
        await nextTick()
        try {
            if (tgUserDataString.value) {
                const response = await api.post("/users/validate", { initData: tgUserDataString.value })
                if (response.data.valid) {
                    return true
                }
            }
            return false
        } catch (error) {
            console.error("Ошибка при валидации пользователя:", error)
            return false
        }
    }

    const fetchUserInfo = async () => {
        try {
            const response = await api.get<UserInfoType>("/users/data")
            user.value = response.data
        } catch (error) {
            console.error("Ошибка при получении данных пользователя:", error)
        }
    }

    return {
        tgUserData,
        tgUserDataString,
        isAdmin,
        loadUserInitData,
        validateUser,
        tgUserId,
        user,
        fetchUserInfo,
    }
})
