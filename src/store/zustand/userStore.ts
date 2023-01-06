import create from "zustand";
import { persist } from "zustand/middleware";

interface User {
    firstname: string,
    lastname: string,
    avatar: string,
    id: number | null,
    email: string
}

interface UserState {
    isLoggedIn: boolean,
    user: User,
    setIsLoggedIn: (val: boolean) => void,
    setUser: (obj : User) => void,
    logoutUser: () => void
}

const noUser = {
    firstname: "",
    lastname: "",
    avatar: "",
    id: null,
    email: ""
}

const useUserStore = create<UserState>()(
    persist((set) => ({
        isLoggedIn: false,
        user: {
            firstname: "",
            lastname: "",
            avatar: "",
            id: null,
            email: ""
        },
        setIsLoggedIn: (val) => set(() => (
            { isLoggedIn: val }
        )),
        setUser: (obj) => set(() => (
            { user: obj }
        )),
        logoutUser: () => set(() => (
            { isLoggedIn: false, user: noUser }
        ))
    }),
    {
        name: "user-storage",
        getStorage: () => sessionStorage
    }
))

export default useUserStore