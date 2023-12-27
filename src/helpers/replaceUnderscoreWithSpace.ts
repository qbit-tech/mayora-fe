export function replaceUnderscoreWithSpace(word: string) {
    const splitter = word.split('_')
    let wordReturn = '';
    splitter.map(word => {
        const lower = word.toLowerCase().slice(1)
        const capital = word.charAt(0).toUpperCase()
        wordReturn = wordReturn + ` ${capital}${lower}`
    })

    return wordReturn
}