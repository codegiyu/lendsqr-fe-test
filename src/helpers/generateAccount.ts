const generateAccount = (str: string | null | undefined): string => {
    let result: string = "";

    if (str) {
        for (let char of str.split("")) {
            result += char.charCodeAt(0)
        }
    
        return result.slice(0, 10)
    }

    return "1234567890"
}

export default generateAccount