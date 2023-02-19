import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import helpers from "../../helpers/allHelpers";

const useAllUsersStore = create<AllUsersStoreState>()(
    persist((set, get) => ({
        allUsers: null,
        totalUsers: 0,
        activeUsers: 0,
        loanUsers: 0,
        savingsUsers: 0,
        pageItemLimit: "15",
        paginatedUsers: [],
        currentPage: 1,
        filteredUsers: null,
        setAllUsers: (array: StatusedUser[] | null) => {
            if (!array) {
                get().clearAllUsers()
            } else {
                let total = array.length;
                let active = array.filter(item => item.status[0] === "Active").length;
                let loan = array.filter(item => Number(item.accountBalance) < Number(item.education.loanRepayment)).length;
                let savings = total - loan;
                
                set(() => (
                    { 
                        allUsers: array,
                        totalUsers: total,
                        activeUsers: active,
                        loanUsers: loan,
                        savingsUsers: savings,
                    }
                ))
            }
        },
        clearAllUsers: () => set(() => (
            { 
                allUsers: null,
                totalUsers: 0,
                activeUsers: 0,
                loanUsers: 0,
                savingsUsers: 0,
                currentSingleUser: null,
                paginatedUsers: [],
                filteredUsers: null
            }
        )),
        setPageItemLimit: (str: string) => {
            set(() => (
                { pageItemLimit: str, currentPage: 1 }
            ))

            get().setPaginatedUsers()
        },
        setPaginatedUsers: () => {
            let num = Number(get().pageItemLimit), arr = get().filteredUsers;
            let newArr = arr ? helpers.pagination(num, arr) : []

            set(() => (
                { 
                    paginatedUsers: newArr
                }
            ))
        },
        setCurrentPage: (num: number) => set(() => (
            { currentPage: num }
        )),
        blacklistUser: (id: string) => {
            let all = get().allUsers, index = Number(id) - 1;
            if (all) {
                all[index].status.unshift("Blacklisted")
            }

            let filtered = get().filteredUsers
            if (filtered) {
                filtered = filtered.map(item => {
                    if (item.id === id) {
                        item.status.unshift("Blacklisted")
                    }
                    return item
                })
            }

            get().setAllUsers(all)
            get().setFilteredUsers(filtered)
        },
        activateUser: (id: string) => {
            let all = get().allUsers, index = Number(id) - 1;
            if (all) {
                all[index].status.shift()
            }

            let filtered = get().filteredUsers
            if (filtered) {
                filtered = filtered?.map(item => {
                    if (item.id === id) {
                        item.status.shift()
                    }
                    return item
                })
            }
            

            get().setAllUsers(all)
            get().setFilteredUsers(filtered)
        },
        setFilteredUsers: (arr: StatusedUser[] | null) => {
            if (!arr) {
                set(() => (
                    { 
                        totalUsers: 0,
                        activeUsers: 0,
                        loanUsers: 0,
                        savingsUsers: 0,
                        filteredUsers: null
                    }
                ))
                get().setPaginatedUsers()
            } else {
                let total = arr.length;
                let active = arr.filter(item => item.status[0] === "Active").length;
                let loan = arr.filter(item => Number(item.accountBalance) < Number(item.education.loanRepayment)).length;
                let savings = total - loan;
                
                set(() => (
                    { 
                        totalUsers: total,
                        activeUsers: active,
                        loanUsers: loan,
                        savingsUsers: savings,
                        filteredUsers: arr
                    }
                ))
                get().setPaginatedUsers()
            }
        },
        resetFilteredUsers: () => {
            let arr: StatusedUser[] | null = get().allUsers
            get().setFilteredUsers(arr)
        }
    }),
    {
        name: "allUsers-storage",
        storage: createJSONStorage(() => sessionStorage)
    }
))

export default useAllUsersStore