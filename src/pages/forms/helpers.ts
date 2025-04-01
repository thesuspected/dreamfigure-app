import { InitialFormType } from "./types"

export const generateAgeOptions = () => {
    const start = 14
    const end = 100
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => {
        let ageWord = "лет"
        const lastTwoDigits = number % 100
        const lastDigit = number % 10

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            ageWord = "лет"
        } else if (lastDigit === 1) {
            ageWord = "год"
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            ageWord = "года"
        }

        return { label: `${number} ${ageWord}`, value: number }
    })
}
export const generateHeightOptions = () => {
    const start = 100
    const end = 220
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} см`, value: number }))
}
export const generateInitialWeightOptions = () => {
    const start = 40
    const end = 150
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} кг`, value: number }))
}
export const generateCurrentWeightOptions = () => {
    const start = 40
    const end = 80
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} кг`, value: number }))
}
export const generateWaistLength = () => {
    const start = 50
    const end = 120
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} см`, value: number }))
}
export const generateNeckLength = () => {
    const start = 30
    const end = 70
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} см`, value: number }))
}
export const generateHipsLength = () => {
    const start = 40
    const end = 130
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} см`, value: number }))
}
export const calculateMaleBodyFatPercentage = (form: InitialFormType) => {
    const { waistLength, neckLength, height } = form
    return (495 / (1.0324 - 0.19077 * Math.log10(waistLength - neckLength) + 0.15456 * Math.log10(height)) - 450).toFixed(2)
}
export const calculateFemaleBodyFatPercentage = (form: InitialFormType) => {
    const { waistLength, neckLength, height, hipsLength } = form
    return (
        495 / (1.29579 - 0.35004 * Math.log10(waistLength + hipsLength - neckLength) + 0.221 * Math.log10(height)) -
        450
    ).toFixed(2)
}

export const generateWaterOptions = () => {
    const start = 1
    const end = 30
    const range = [...Array(end - start + 1).keys()].map((x) => (x + start) * 100)
    return range.map((number) => ({ label: `${number} мл`, value: number }))
}

export const getPhysicalOptions = () => [
    {
        label: "Истощение",
        value: "exhaustion",
        emoji: "🥀",
    },
    {
        label: "Утомление",
        value: "fatigue",
        emoji: "💢",
    },
    {
        label: "Нейтральность",
        value: "neutrality",
        emoji: "🔆",
    },
    {
        label: "Бодрость",
        value: "courage",
        emoji: "💪",
    },
    {
        label: "Энергичность",
        value: "energy",
        emoji: "⚡️",
    },
]