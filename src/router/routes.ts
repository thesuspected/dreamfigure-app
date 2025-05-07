import type { RouteRecordRaw } from "vue-router"
import ErrorNotFound from "pages/ErrorNotFound.vue"
import UserLayout from "layouts/UserLayout.vue"
import IndexPage from "pages/IndexPage.vue"
import InitialForm from "pages/forms/InitialForm.vue"
import AddNutritionForm from "pages/forms/AddNutritionForm.vue"
import DailyReportForm from "pages/forms/DailyReportForm.vue"
import WeekReportForm from "pages/forms/WeekReportForm.vue"

export enum RouteNames {
    // user
    USER_LAYOUT = "user-layout",
    USER_INDEX = "",
    USER_INITIAL_FORM = "initial-form",
    ADD_NUTRITION_FORM = "add-nutrition-form",
    DAILY_REPORT_FORM = "daily-report-form",
    WEEK_REPORT_FORM = "week-report-form",
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
            {
                path: RouteNames.DAILY_REPORT_FORM,
                name: RouteNames.DAILY_REPORT_FORM,
                component: DailyReportForm,
            },
            {
                path: RouteNames.WEEK_REPORT_FORM,
                name: RouteNames.WEEK_REPORT_FORM,
                component: WeekReportForm,
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
