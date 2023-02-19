const formatOrgName = (name: string | undefined): string => {
    if (name) {
        return name[0].toUpperCase() + name.slice(1)
    }
    return "nil"
}

export default formatOrgName