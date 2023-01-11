import React, { useEffect, useState } from "react";
import classes from "./User.module.scss";
import Layout from "../layout/Layout";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import useUserStore from "../store/zustand/userStore";
import useAlertStore from "../store/zustand/alertStore";
import { CompleteUser } from "../store/zustand/userStore";
import { StatusedUser } from "../store/zustand/allUsersStore";
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
import { UserRowData } from "../components/UserRow";
import Modal from "../components/Modal";
import Input, { Select } from "../components/Input";
import Button, { GhostButton, Ghost } from "../components/Button";
import { stringDate, formatPhone } from "../components/UserRow";



const User: React.FC = () => {
    let navigate: NavigateFunction = useNavigate()
    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const setAlert = useAlertStore(state => state.setAlert)
    const allUsers = useAllUsersStore(state => state.allUsers)

    let [pageData, setPageData] = useState<StatusedUser | null>(null)
    let [modalActive, setModalActive] = useState<boolean>(false)

    useEffect(() => {
        if (!isLoggedIn) {
            setAlert({ message: "You must be logged in to view this page", type: "error" })
            navigate("/login")
        }
    })

    const { id } = useParams()

    useEffect(() => {
        const userData: StatusedUser | null | undefined = allUsers !== null
        ? allUsers.find(item => item.id === id)
        : null
    }, [id, allUsers])

    

    let activateBtnObj: Ghost = {
        text: "Activae User",
        type: "button",
        color: "teal",
        handleClick: () => {}
    }

    let blacklistBtnObj: Ghost = {
        text: "Blacklist User",
        type: "button",
        color: "red",
        handleClick: () => {}
    }
    
    return (
        <Layout layoutProps={{ page: "Users" }}>
            <section className={classes.users__content_wrap}>
                <div className={classes.back_button_wrap}>
                    <span></span>
                    <p>Back</p>
                </div>
                <div className={classes.page_heading_wrap}>
                    <h1 className={classes.users__heading}>Users</h1>
                    <div className={classes.heading_btns_wrap}>
                        <GhostButton btnProps={blacklistBtnObj} />
                        <GhostButton btnProps={activateBtnObj} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default User