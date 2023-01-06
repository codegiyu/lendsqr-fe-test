import create from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    firstname: string,
    lastname: string,
    avatar: string,
    id: string,
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
    id: "",
    email: ""
}


interface UserProfile {
    "firstName": string;
    "lastName": string;
    "phoneNumber": string;
    "avatar": string;
    "gender": string;
    "bvn": string;
    "address": string;
    "currency": string;
}

interface UserGuarantor {
    "firstName": string;
    "lastName": string;
    "phoneNumber": string;
    "gender": string;
    "address": string;
}

interface UserSocials {
    "facebook": string;
    "instagram": string;
    "twitter": string;
}

interface UserEducation {
    "level": string;
    "employmentStatus": string;
    "sector": string;
    "duration": string;
    "officeEmail": string;
    "monthlyIncome": string[];
    "loanRepayment": string;
}

export interface CompleteUser {
    "createdAt": string;
    "orgName": string;
    "userName": string;
    "email": string;
    "phoneNumber": string;
    "lastActiveDate": string;
    "profile": UserProfile;
    "guarantor": UserGuarantor;
    "accountBalance": string;
    "accountNumber": string;
    "socials": UserSocials;
    "education": UserEducation;
    "id": string;
}

const useUserStore = create<UserState>()(
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
        getStorage: () => sessionStorage
    }
))

export default useUserStore