import { defineStore } from "pinia"
import { computed, nextTick, ref } from "vue"
import { TgInitData, UserStoreType } from "src/stores/user/types"
import { useMiniApp } from "vue-tg"
import { LocalStorage } from "quasar"
import { api } from "boot/axios"

export enum UserStoreEnum {
    USER_STORE = "USER_STORE",
    USER_LOCAL_STORE = "USER_LOCAL_STORE",
}

export const useUserStore = defineStore(UserStoreEnum.USER_STORE, () => {
    const { initData } = useMiniApp()
    const userData = ref<UserStoreType>()
    const isAdmin = ref(false)

    const tgUserId = computed(() => userData.value?.initData.user.id)

    const loadUserInitData = () => {
        if (initData.includes("user")) {
            const urlParams = Object.fromEntries(new URLSearchParams(initData))
            const initDataObject = {
                ...urlParams,
                user: JSON.parse(urlParams.user),
            } as TgInitData
            userData.value = { initData: initDataObject }
            setLocalStorage()
        } else {
            getLocalStorage()
        }
    }

    const getLocalStorage = () => {
        const local: UserStoreType | null = LocalStorage.getItem(UserStoreEnum.USER_LOCAL_STORE)
        if (local) {
            userData.value = local
        }
    }

    const setLocalStorage = () => {
        if (userData.value) {
            LocalStorage.set(UserStoreEnum.USER_LOCAL_STORE, userData.value)
        }
    }

    const validateUser = async () => {
        await nextTick()
        if (userData.value?.initData) {
            const validateData = await api.post("/users/validate", userData.value.initData)
            if (validateData) {
                // isAdmin.value = validateData.data.isAdmin
            }
        }
    }

    return {
        userData,
        isAdmin,
        loadUserInitData,
        validateUser,
        tgUserId,
    }
})
