import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const noUser: User = {
    firstname: "",
    lastname: "",
    avatar: "",
    id: "",
    email: ""
}

const useUserStore = create<UserStoreState>()(
    persist((set) => ({
        isLoggedIn: false,
        user: {
            firstname: "",
            lastname: "",
            avatar: "",
            id: "",
            email: ""
        },
        setIsLoggedIn: (val) => set(() => (
            { isLoggedIn: val }
        )),
        setUser: (obj) => set(() => (
            { user: obj, isLoggedIn: true }
        )),
        logoutUser: () => set(() => (
            { isLoggedIn: false, user: noUser }
        ))
    }),
    {
        name: "user-storage",
        storage: createJSONStorage(() => sessionStorage)
    }
))

export default useUserStore