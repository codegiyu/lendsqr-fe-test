const pagination = (num: number, arr: StatusedUser[] | null) => {
    let currentIndex = 0, pages = []

    if (arr === null) return []

    if (num <= 0) num = 1

    while (currentIndex < arr.length) {
        let page = arr.slice(currentIndex, currentIndex + num)
        pages.push(page)
        currentIndex += num
    }

    return pages
}

export default pagination