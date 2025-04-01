export const generateHourOptions = () => {
    const start = 0
    const end = 23
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => {
        const value = String(number).length === 1 ? `0${number}` : String(number)
        return {
            label: value,
            value,
        }
    })
}
export const generateMinuteOptions = () => {
    const start = 0
    const end = 59
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => {
        const value = String(number).length === 1 ? `0${number}` : String(number)
        return {
            label: value,
            value,
        }
    })
}

export const generateDayOptions = () => {
    const start = 1
    const end = 31
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number}`, value: number }))
}

const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
export const generateMonthOptions = () => {
    const start = 0
    const end = 11
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${months[number]}`, value: number }))
}

export const generateYearOptions = () => {
    const start = 1940
    const end = 2010
    const range = [...Array(end - start + 1).keys()].map((x) => x + start)
    return range.map((number) => ({ label: `${number} г`, value: number }))
}