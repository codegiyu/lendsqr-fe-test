const formatPhone = (phone: string | undefined): string => {
    if (phone) {
        let formattedPhone = phone.split("x")[0]
        return formattedPhone.replaceAll(".", "-")
    }
    return "nil"
}

export default formatPhone