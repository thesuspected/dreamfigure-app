import { defineBoot } from "#q-app/wrappers"
import axios, { type AxiosInstance } from "axios"
import { useUserStore } from "stores/user/user"

declare module "vue" {
    interface ComponentCustomProperties {
        $axios: AxiosInstance
        $api: AxiosInstance
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// export const BASE_URL = process.env.NODE_VAR === "DEVELOPMENT" ? process.env.DEV_LINK : process.env.PROD_LINK
export const BASE_URL = "https://dreamfigure.online"

// export const BASE_URL = "https://dreamfigure-back.ru.tuna.am/"
// export const BASE_URL = "https://dreamfigure.online"
// export const BASE_URL = 'http://localhost:8080'
const api = axios.create({ baseURL: BASE_URL })

// Добавляем перехватчик запросов для автоматической отправки userId
api.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const userId = userStore.tgUserId

    if (userId) {
        config.headers["X-User-ID"] = userId
    }

    return config
})

export default defineBoot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
})

export { api }
