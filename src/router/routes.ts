import type { RouteRecordRaw } from "vue-router"
import ErrorNotFound from "pages/ErrorNotFound.vue"
import UserLayout from "layouts/UserLayout.vue"
import IndexPage from "pages/IndexPage.vue"
import InitialForm from "pages/forms/InitialForm.vue"
import AddNutritionForm from "pages/forms/AddNutritionForm.vue"
import DailyReportForm from "pages/forms/DailyReportForm.vue"
import WeekReportForm from "pages/forms/WeekReportForm.vue"
import IndexAdminPage from "pages/admin/IndexAdminPage.vue"
import UserStats from "pages/UserStats.vue"
import UserSettings from "pages/UserSettings.vue"

export enum RouteNames {
    // user
    USER_HOME = "/home",
    USER_STATS = "/stats",
    USER_SETTINGS = "/settings",
    // user forms
    USER_INITIAL_FORM = "/initial-form",
    ADD_NUTRITION_FORM = "/add-nutrition-form",
    DAILY_REPORT_FORM = "/daily-report-form",
    WEEK_REPORT_FORM = "/week-report-form",
    // admin
    ADMIN_HOME = "/admin",
}

const routes: RouteRecordRaw[] = [
    // user
    {
        path: "/",
        redirect: RouteNames.USER_HOME,
    },
    {
        path: RouteNames.USER_HOME,
        name: RouteNames.USER_HOME,
        component: IndexPage,
    },
    {
        path: RouteNames.USER_STATS,
        name: RouteNames.USER_STATS,
        component: UserStats,
    },
    {
        path: RouteNames.USER_SETTINGS,
        name: RouteNames.USER_SETTINGS,
        component: UserSettings,
    },
    // user forms
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
    // admin
    {
        path: RouteNames.ADMIN_HOME,
        name: RouteNames.ADMIN_HOME,
        component: IndexAdminPage,
    },
    // 404,
    {
        path: "/:catchAll(.*)*",
        component: ErrorNotFound,
    },
]

export default routes
