export interface InitialFormType {
    callName?: string
    gender: string
    birthDate: {
        day: number,
        month: number,
        year: number,
    }
    age: number
    height: number
    initialWeight: number
    currentWeight: number
    waistLength: number
    neckLength: number
    hipsLength: number
    calcFatPercent?: string
    calcIdealWeight?: string
}

export interface DailyReportFormType {
    riseTime: {
        hour: string
        minute: string
    },
    sleepTime: {
        hour: string
        minute: string
    },
    physicalState?: string
    emotionalState?: string
    waterAmount: number
    activitySteps?: string
    activityTypes?: string
    activityText?: string
}
