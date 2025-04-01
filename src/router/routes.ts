import type { RouteRecordRaw } from "vue-router"
import ErrorNotFound from "pages/ErrorNotFound.vue"
import UserLayout from "layouts/UserLayout.vue"
import IndexPage from "pages/IndexPage.vue"
import InitialForm from "pages/forms/InitialForm.vue"
import AddNutritionForm from "pages/forms/AddNutritionForm.vue"

export enum RouteNames {
    // user
    USER_LAYOUT = "user-layout",
    USER_INDEX = "",
    USER_INITIAL_FORM = "initial-form",
    ADD_NUTRITION_FORM = "add-nutrition-form"
}

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: RouteNames.USER_LAYOUT,
        component: UserLayout,
        redirect: { name: RouteNames.USER_INDEX },
        children: [
            {
                path: RouteNames.USER_INDEX,
                component: IndexPage,
            },
            {
                path: RouteNames.USER_INITIAL_FORM,
                name: RouteNames.USER_INITIAL_FORM,
                component: InitialForm,
            },
            {
                path: RouteNames.ADD_NUTRITION_FORM,
                name: RouteNames.ADD_NUTRITION_FORM,
                component: AddNutritionForm,
            },
        ],
    },
    // 404,
    {
        path: "/:catchAll(.*)*",
        component: ErrorNotFound,
    },
]

export default routes
