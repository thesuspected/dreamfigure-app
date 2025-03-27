export const generateHeightOptions = () => {
    const start = 100
    const end = 220
    const range = [...Array(end - start + 1).keys()].map(x => x + start)
    return range.map((number) => ({ name: `${number} см`, value: number }))
}