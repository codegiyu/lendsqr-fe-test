import React, { useEffect, useState } from "react";
import classes from "./Home.module.scss";
import Layout from "../layout/Layout";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useUserStore from "../store/zustand/userStore";
import useAlertStore from "../store/zustand/alertStore";
import useAllUsersStore from "../store/zustand/allUsersStore";
import StatusBox from "../components/StatusBox";
import blockUsers from "../images/block-users.svg";
import blockActive from "../images/block-active.svg";
import blockLoans from "../images/block-loans.svg";
import blockSavings from "../images/block-savings.svg";
import ErrorBoundary from "../components/ErrorBoundary";
import Pagination from "../components/Pagination";
import { IoFilterSharp } from "react-icons/io5";
import UserRow from "../components/UserRow";
import uuid from "react-uuid";
import Modal from "../components/Modal";
import Input, { Select } from "../components/Input";
import Button, { GhostButton } from "../components/Button";
import helpers from "../helpers/allHelpers";

let defaultFilters: FilterValues = {
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
}

const Home: React.FC = () => {
    let navigate: NavigateFunction = useNavigate()
    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const setAlert = useAlertStore(state => state.setAlert)
    const allUsers = useAllUsersStore(state => state.allUsers)
    // const originalUsers = useAllUsersStore(state => state.allUsers)
    const setAllUsers = useAllUsersStore(state => state.setAllUsers)
    const setFilteredUsers = useAllUsersStore(state => state.setFilteredUsers)
    const resetFilteredUsers = useAllUsersStore(state => state.resetFilteredUsers)
    const totalUsers = useAllUsersStore(state => state.totalUsers)
    const activeUsers = useAllUsersStore(state => state.activeUsers)
    const loanUsers = useAllUsersStore(state => state.loanUsers)
    const savingsUsers = useAllUsersStore(state => state.savingsUsers)
    const paginatedUsers = useAllUsersStore(state => state.paginatedUsers)
    const currentPage = useAllUsersStore(state => state.currentPage)

    let [pageData, setPageData] = useState<UserRowData[] | []>([])
    let [modalActive, setModalActive] = useState<boolean>(false)
    let [filterValues, setFilterValues] = useState<FilterValues>(defaultFilters)

    let tableHeight = modalActive ? {minHeight: "600px"} : {}

    const handleFilterToggle = () => {
        setModalActive((prevState) => !prevState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        setFilterValues((prevState) => {
            return {...prevState, [name]: e.target.value }
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let name = e.target.name
        setFilterValues((prevState) => {
            return {...prevState, [name]: e.target.value }
        })
    }

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let {organization, username, email, date, phone, status} = filterValues
        let queryArr = []

        if (organization) queryArr.push(`organization=${organization}`)
        if (username) queryArr.push(`username=${username}`)
        if (email) queryArr.push(`email=${email}`)
        if (date) queryArr.push(`date=${date}`)
        if (phone) queryArr.push(`phone=${phone}`)
        if (status) queryArr.push(`status=${status}`)

        let query: string = queryArr.join("&")

        if (query) {
            navigate(`/?${query}`, {replace: true})
            let filteredArr = allUsers

            if(filteredArr) {
                if (organization) {
                    filteredArr = filteredArr.filter(item => item.orgName === organization)
                }
                if (username) {
                    filteredArr = filteredArr.filter(item => `${item.profile.firstName} ${item.profile.lastName}`.includes(username))
                }
                if (email) {
                    filteredArr = filteredArr.filter(item => item.email.includes(email))
                }
                if (date) {
                    filteredArr = filteredArr.filter(item => helpers.stringDate(item.createdAt).includes(helpers.stringDate(date).slice(0, 12)))
                }
                if (phone) {
                    filteredArr = filteredArr.filter(item => helpers.formatPhone(item.phoneNumber).includes(phone))
                }
                if (status) {
                    filteredArr = filteredArr.filter(item => item.status.includes(status))
                }

                if (!filteredArr.length) {
                    setFilteredUsers(null)
                } else {
                    setFilteredUsers(filteredArr)
                }
            }
            
            setModalActive(false)
        } else {
            resetFilteredUsers()
            navigate("/", {replace: true})
            setModalActive(false)
        }
        
    }
    
    useEffect(() => {
        if (!isLoggedIn) {
            setAlert({ message: "You must be logged in to view the Home page", type: "error" })
            navigate("/login")
        }
    })

    useEffect(() => {
        if (!allUsers) {
            fetch("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error(response.statusText)
            })
            .then(jsonres => {
                let result: CompleteUser[] = JSON.parse(jsonres)
                let statusedRes: StatusedUser[] = result.map(item => {
                    if (item.orgName.split("-")[0].length < 5) {
                        item.orgName = "Lendsqr"
                    } else if (item.orgName.split("-")[0].length < 8) {
                        item.orgName = "Lendstar"
                    } else if (item.orgName.split("-")[0].length >= 8) {
                        item.orgName = "Irorun"
                    }

                    let status = []
                    if (new Date(item.createdAt).getTime() > Date.now()) {
                        status.push("Pending")
                    }
                    if (new Date(item.createdAt).getTime() < Date.now()
                        && new Date(item.createdAt).getTime() < new Date(item.lastActiveDate).getTime()) {
                        status.push("Active")
                    } else status.push("Inactive")
                    return {
                        ...item,
                        status
                    }
                })
                setAllUsers(statusedRes)
                setFilteredUsers(statusedRes)
            })
            .catch(error => {
                setAlert({ 
                    message: error.message, 
                    type: "error" 
                })
            })
        }
    }, [setAlert, setAllUsers, allUsers, setFilteredUsers])

    useEffect(() => {
        if(paginatedUsers.length) {
            let data: UserRowData[] = paginatedUsers[currentPage - 1].map(item => {
                return {
                    id: item.id,
                    orgName: item.orgName,
                    firstName: item.profile.firstName,
                    lastName: item.profile.lastName,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    createdAt: item.createdAt,
                    status: item.status
                }
            })
            setPageData(data)
        } else setPageData([])
        
    }, [paginatedUsers, currentPage])

    let totalObj: StatusBoxProps = {
        image: blockUsers,
        title: "Users",
        text: String(totalUsers)
    }

    let activeObj: StatusBoxProps = {
        image: blockActive,
        title: "Active Users",
        text: String(activeUsers)
    }

    let loanObj: StatusBoxProps = {
        image: blockLoans,
        title: "Users With Loans",
        text: String(loanUsers)
    }

    let savingsObj: StatusBoxProps = {
        image: blockSavings,
        title: "Users With Savings",
        text: String(savingsUsers)
    }

    let filterObj: ModalProps = {
        isFilter: true, 
        modalActive, 
        setModalActive
    }

    let orgSelect: SelectProps = {
        name: "organization",
        value: filterValues.organization,
        options: [["", "Select"], ["Lendsqr", "Lendsqr"], ["Lendstar", "Lendstar"], ["Irorun", "Irorun"]],
        handleSelectChange
    }

    let statusSelect: SelectProps = {
        name: "status",
        value: filterValues.status,
        options: [["", "Select"], ["Active", "Active"], ["Inactive", "Inactive"], ["Pending", "Pending"], ["Blacklisted", "Blacklisted"]],
        handleSelectChange
    }

    let usernameInput: InputProps = {
        name: "username", 
        type: "text", 
        placeholder: "User",
        value: filterValues.username, 
        handleChange, 
        fromFilter: true
    }

    let emailInput: InputProps = {
        name: "email", 
        type: "text", 
        placeholder: "Email",
        value: filterValues.email, 
        handleChange, 
        fromFilter: true
    }

    let dateInput: InputProps = {
        name: "date", 
        type: "date", 
        placeholder: "Date",
        value: filterValues.date, 
        handleChange, 
        fromFilter: true
    }

    let phoneInput: InputProps = {
        name: "phone", 
        type: "text", 
        placeholder: "Phone Number",
        value: filterValues.phone, 
        handleChange, 
        fromFilter: true
    }

    let resetBtnObj: GhostBtnProps = {
        text: "Reset",
        type: "reset",
        color: "grey",
        handleClick: () => {
            setFilterValues(defaultFilters)
            resetFilteredUsers()
            setModalActive(false)
            navigate("/", {replace: true})
        }
    }

    let filterBtnObj: BtnProps = {
        text: "Filter",
        fromFilter: true
    }
    
    return (
        <Layout propsObj={{ page: "Users" }}>
            <section className={classes.users__content_wrap}>
                <h1 className={classes.users__heading}>Users</h1>
                <section className={classes.status_section}>
                    <div className={classes.status_box_wrap}>
                        <ErrorBoundary>
                            <StatusBox propsObj={ totalObj } />
                        </ErrorBoundary>
                    </div>
                    <div className={classes.status_box_wrap}>
                        <ErrorBoundary>
                            <StatusBox propsObj={ activeObj } />
                        </ErrorBoundary>
                    </div>
                    <div className={classes.status_box_wrap}>
                        <ErrorBoundary>
                            <StatusBox propsObj={ loanObj } />
                        </ErrorBoundary>
                    </div>
                    <div className={classes.status_box_wrap}>
                        <ErrorBoundary>
                            <StatusBox propsObj={ savingsObj } />
                        </ErrorBoundary>
                    </div>
                </section>
                <section className={classes.table_section}>
                    <ErrorBoundary>
                        <Modal propsObj={filterObj}>
                            <form onSubmit={handleFilterSubmit}>
                                <Select propsObj={orgSelect} />
                                <Input propsObj={usernameInput} />
                                <Input propsObj={emailInput} />
                                <Input propsObj={dateInput} />
                                <Input propsObj={phoneInput} />
                                <Select propsObj={statusSelect} />
                                <div className={classes.btn_row}>
                                    <div className={classes.btn_wrap}>
                                        <GhostButton propsObj={resetBtnObj} />
                                    </div>
                                    <div className={classes.btn_wrap}>
                                        <Button propsObj={filterBtnObj} />
                                    </div>
                                </div>
                            </form>
                        </Modal>
                    </ErrorBoundary>
                    <div style={tableHeight} className={classes.table__box}>
                        <table className={classes.users_table}>
                            <colgroup>
                                <col className={classes.col_1} width="15%" />
                                <col className={classes.col_2} width="14%" />
                                <col className={classes.col_3} width="25%" />
                                <col className={classes.col_4} width="16%" />
                                <col className={classes.col_5} width="18%" />
                                <col className={classes.col_6} width="10%" />
                                <col className={classes.col_7} width="2%" />
                            </colgroup>
                        
                            <thead>
                                <tr>
                                    <th className={classes.col_1}>
                                        <p>Organization</p>
                                        <span>
                                            <IoFilterSharp
                                                className={classes.filter_icon}
                                                onClick={handleFilterToggle}
                                            />
                                        </span>
                                    </th>
                                    <th className={classes.col_2}>
                                        <p>Username</p>
                                        <span>
                                            <IoFilterSharp
                                                className={classes.filter_icon}
                                                onClick={handleFilterToggle}
                                            />
                                        </span>
                                    </th>
                                    <th className={classes.col_3}>
                                        <p>Email</p>
                                        <span>
                                            <IoFilterSharp
                                                className={classes.filter_icon}
                                                onClick={handleFilterToggle}
                                            />
                                        </span>
                                    </th>
                                    <th className={classes.col_4}>
                                        <p>Phone Number</p>
                                        <span>
                                            <IoFilterSharp
                                                className={classes.filter_icon}
                                                onClick={handleFilterToggle}
                                            />
                                        </span>
                                    </th>
                                    <th className={classes.col_5}>
                                        <p>Date Joined</p>
                                        <span>
                                            <IoFilterSharp
                                                className={classes.filter_icon}
                                                onClick={handleFilterToggle}
                                            />
                                        </span>
                                    </th>
                                    <th className={classes.col_6}>
                                        <p>Status</p>
                                        <span>
                                            <IoFilterSharp
                                                className={classes.filter_icon}
                                                onClick={handleFilterToggle}
                                            />
                                        </span>
                                    </th>
                                    <th className={classes.col_7}>
                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { pageData.length ? (
                                    pageData.map(item => <UserRow key={uuid()} propsObj={item} />)
                                    ) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className={classes.users__pagination}>
                    <ErrorBoundary>
                        <Pagination />
                    </ErrorBoundary>
                </section>
            </section>
        </Layout>
    )
}

export default Home