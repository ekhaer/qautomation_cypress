class Helper {
    getNumber(text) {
        if (!text) return 0;
        const num = text.match(/(\d{1,2})/)
        const final = num ? num[0] : '0'; // Default to '0' if no match
        const result = parseFloat(final);
        return result
    }
    getWord(text) {
        const halfLength = text.length / 2;
        const firstWord = text.slice(0, halfLength);
        const result = text === firstWord.repeat(2) ? firstWord : text;
        return result;
    }
}
export default Helper
