export function replaceDashWithSpace(word: string) {
    const splitter = word.split('-')
    let wordReturn = '';
    splitter.map(word => {
        const lower = word.toLowerCase().slice(1)
        const capital = word.charAt(0).toUpperCase()
        wordReturn = wordReturn + ` ${capital}${lower}`
    })

    return wordReturn
}