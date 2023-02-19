const getIncome = (arr: string[] | undefined): string => {
    if (arr) {
        return arr[0] < arr[1] 
        ? `₦${Math.floor(Number(arr[0]) / 100) * 100} - ₦${Math.ceil(Number(arr[1]) / 100) * 100}`
        : `₦${Math.floor(Number(arr[1]) / 100) * 100} - ₦${Math.ceil(Number(arr[0]) / 100) * 100}`
    }
    return "nil"
}

export default getIncome