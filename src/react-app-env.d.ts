/// <reference types="react-scripts" />

interface CompWithChildrenAndProps<T> {
    propsObj: T;
    children?: React.ReactNode
}

interface CompWithPropsOnly<T> {
    propsObj: T;
}

interface CompWithChildrenOnly {
    children: React.ReactNode;
}

interface ErrorBoundaryStateProps {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

interface BtnProps {
    text?: string; 
    type?: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
    fromFilter?: boolean
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface GhostBtnProps extends BtnProps {
    color: string;
}

interface DetailsBlockProps {
    heading: string;
}

interface DetailSingleProps {
    title: string;
    value: string | undefined;
}

interface InputProps {
    name: string; 
    type: React.HTMLInputTypeAttribute | undefined; 
    placeholder: string;
    passwordVisibilityToggle?: boolean;
    value: string; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fromFilter?: boolean;
}

interface SelectProps {
    name: string;
    value: string;
    options: string[][];
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface ModalProps {
    isFilter?: boolean;
    forProfile?: boolean;
    modalActive: boolean;
    setModalActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PaginationControls {
    prev: boolean;
    next: boolean;
}

interface SidenavProps {
    page: string
}

interface StatusBoxProps {
    image: string;
    title: string;
    text: string;
}

interface UserRowData {
    id: string;
    orgName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    status: string[];
}

interface UserRowOptionsButtonsDisabledState {
    activate: boolean;
    blacklist: boolean;
}

interface FilterValues {
    organization: string;
    username: string;
    email: string;
    date: string;
    phone: string;
    status: string;
}

interface LoginFormValues {
    email: string;
    password: string;
}

interface User {
    firstname: string,
    lastname: string,
    avatar: string,
    id: string,
    email: string
}

interface UserStoreState {
    isLoggedIn: boolean,
    user: User,
    setIsLoggedIn: (val: boolean) => void,
    setUser: (obj : User) => void,
    logoutUser: () => void
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

interface CompleteUser {
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

interface StatusedUser extends CompleteUser {
    status: string[]
}

interface AllUsersStoreState {
    allUsers: StatusedUser[] | null;
    totalUsers: number;
    activeUsers: number;
    loanUsers: number;
    savingsUsers: number;
    pageItemLimit: string;
    paginatedUsers: StatusedUser[][] | [];
    currentPage: number;
    filteredUsers: StatusedUser[] | null;
    setAllUsers: (arr: StatusedUser[] | null) => void;
    clearAllUsers: () => void;
    setPageItemLimit: (str: string) => void;
    setPaginatedUsers: () => void;
    setCurrentPage: (num: number) => void;
    blacklistUser: (id: string) => void;
    activateUser: (id: string) => void;
    setFilteredUsers: (arr: StatusedUser[] | null) => void;
    resetFilteredUsers: () => void;
}