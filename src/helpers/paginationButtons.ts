const paginationButtons = (total: number, current: number): string[] => {
    const arr: string[] = Array(7).fill("0")
    arr[0] = "1"
    arr[6] = String(total)

    if (total <= 7) return Array(total).fill("").map((item, idx) => item + ++idx)

    if (current === 1 || current === 2) {
        arr[1] = "2"
        arr[2] = "3"
        arr[3] = "..."
        arr[4] = String(total - 2)
        arr[5] = String(total - 1)
    }

    if (current === 3) {
        arr[1] = "2"
        arr[2] = "3"
        arr[3] = "4"
        arr[4] = "..."
        arr[5] = String(total - 1)
    }

    if (current > 3 && current < total - 2) {
        arr[1] = "..."
        arr[2] = String(current - 1)
        arr[3] = String(current)
        arr[4] = String(current + 1)
        arr[5] = "..."
    }

    if (current === total - 2) {
        arr[1] = "2"
        arr[2] = "..."
        arr[3] = String(total - 3)
        arr[4] = String(total - 2)
        arr[5] = String(total - 1)
    }

    if (current === total || current === total - 1) {
        arr[1] = "2"
        arr[2] = "3"
        arr[3] = "..."
        arr[4] = String(total - 2)
        arr[5] = String(total - 1)
    }

    return arr
}

export default paginationButtons