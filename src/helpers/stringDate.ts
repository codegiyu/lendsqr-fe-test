const stringDate = (str: string | undefined): string => {
    if (str) {
        let date = new Date(str)
    
        let day: string[] | string = date.toString().slice(4, 15).split("")
        day.splice(6, 0, ",")
        day = day.join("")
    
        let time: string[] | string = date.toLocaleTimeString().split("")
        time.splice(-6, 3)
        time = time.join("")
    
        return day + " " + time
    }
    return "nil"
}

export default stringDate