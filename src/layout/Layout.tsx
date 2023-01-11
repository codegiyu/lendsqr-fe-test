import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Layout.module.scss";
import logo from "../images/logo.svg";
import lendsqr from "../images/lendsqr.svg";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/Input";
import { TbSearch } from "react-icons/tb";
import { IoIosNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";
import Button from "../components/Button";
import useUserStore from "../store/zustand/userStore";
import Sidenav from "../components/Sidenav";
import Modal from "../components/Modal";
import logout from "../images/nav-logout.svg";
import settings from "../images/nav-user-cog.svg";
import profile from "../images/nav-user.svg";
import useAlertStore from "../store/zustand/alertStore";
import useAllUsersStore from "../store/zustand/allUsersStore";


interface layoutProps {
    page: string;
}

interface Props {
    layoutProps: layoutProps;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    let {page} = props.layoutProps

    let navigate = useNavigate()

    const logoutUser = useUserStore(state => state.logoutUser)
    const setAlert = useAlertStore(state => state.setAlert)
    const clearAllUsers = useAllUsersStore(state => state.clearAllUsers)

    let [value, setValue] = useState<string>("")
    let [modalActive, setModalActive] = useState<boolean>(false)
    let [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

    let user = useUserStore(state => state.user)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setValue("")
    }

    const handleActivateModal = () => {
        setModalActive(true)
    }

    const handleDeactivateModal = () => {
        setModalActive(false)
    }

    const handleLogout = () => {
        logoutUser()
        clearAllUsers()
        setAlert({ message: "You have logged out successfully", type: "success" })
        navigate("/login", {replace: true})
    }

    const handleMenuClick = () => {
        setMenuIsOpen((prevState) => !prevState)
    }

    let searchProps = {
        name: "search", 
        type: "search",
        placeholder: "Search for anything",
        value, 
        handleChange
    }

    return (
        <div className={classes.page__body}>
            <header className={classes.page__header}>
                <div className={classes.page__header_wrap}>
                    <div className={classes.page__logo_wrap}>
                        <img src={ logo } alt="logo" className={classes.page__logo} />
                        <img src={ lendsqr } alt="lendsqr" className={classes.page__logotext} />
                    </div>
                    <form className={classes.search_form} onSubmit={handleSubmit}>
                        <div className={classes.search_form__wrap}>
                            <div className={classes.search__input_wrap}>
                                <ErrorBoundary>
                                    <Input inputProps={searchProps} />
                                </ErrorBoundary>
                            </div>
                            <div className={classes.search__btn_wrap}>
                                <ErrorBoundary>
                                    <Button btnProps={{}}>
                                        <TbSearch className={classes.search_icon} />
                                    </Button>
                                </ErrorBoundary>
                            </div>
                        </div>
                    </form>
                    <div className={classes.page__right_group}>
                        <Link to="#" className={classes.page__docs}>
                            <p>Docs</p>
                        </Link>
                        <Link to="#" className={classes.page__notification}>
                            <span>
                                <IoIosNotificationsOutline className={classes.page__notification_icon} />
                            </span>
                        </Link>
                        <img src={user.avatar} alt="user" className={classes.page__user_img} />
                        <div 
                            className={classes.page__dropdown} 
                            onMouseEnter={handleActivateModal}
                            onMouseLeave={handleDeactivateModal}
                        >
                            <p>{user.lastname}</p>
                            <span>
                            <IoMdArrowDropdown className={classes.page__dropdown_icon} />
                            </span>
                            <Modal modalProps={{ forProfile: true, modalActive, setModalActive }}>
                                <div className={classes.modal_wrap}>
                                    <Link to={`/user/${user.id}`} className={classes.profile_link}>
                                        <button className={classes.user_modal_button}>
                                            <img src={profile} alt="s" className={classes.user_modal_img} />
                                            <p>View Profile</p>
                                        </button>
                                    </Link>
                                    <button 
                                        className={classes.user_modal_button} 
                                        disabled={true}
                                    >
                                        <img src={settings} alt="s" className={classes.user_modal_img} />
                                        <p>Settings</p>
                                    </button>
                                    <button 
                                        className={classes.user_modal_button} 
                                        onClick={handleLogout}
                                    >
                                        <img src={logout} alt="s" className={classes.user_modal_img} />
                                        <p>Logout</p>
                                    </button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <button className={classes.menu_btn} onClick={handleMenuClick}>
                        {
                            menuIsOpen ? (
                                <IoClose className={classes.menu_close_icon} />
                            ) : <IoMenu className={classes.menu_icon} />
                        }
                    </button>
                    <div className={[classes.mobile_menu, menuIsOpen ? classes.menu_active : ""].join(" ")}>
                        <div className={classes.page__logo_wrap}>
                            <img src={ logo } alt="logo" className={classes.page__logo} />
                            <img src={ lendsqr } alt="lendsqr" className={classes.page__logotext} />
                        </div>
                        <form className={classes.search_form} onSubmit={handleSubmit}>
                            <div className={classes.search_form__wrap}>
                                <div className={classes.search__input_wrap}>
                                    <ErrorBoundary>
                                        <Input inputProps={searchProps} />
                                    </ErrorBoundary>
                                </div>
                                <div className={classes.search__btn_wrap}>
                                    <ErrorBoundary>
                                        <Button btnProps={{}}>
                                            <TbSearch className={classes.search_icon} />
                                        </Button>
                                    </ErrorBoundary>
                                </div>
                            </div>
                        </form>
                        <div className={classes.page__right_group}>
                            <Link to="#" className={classes.page__docs}>
                                <p>Docs</p>
                            </Link>
                            <Link to="#" className={classes.page__notification}>
                                <span>
                                    <IoIosNotificationsOutline className={classes.page__notification_icon} />
                                </span>
                            </Link>
                            <img src={user.avatar} alt="user" className={classes.page__user_img} />
                            <div 
                                className={classes.page__dropdown} 
                                onMouseEnter={handleActivateModal}
                                onMouseLeave={handleDeactivateModal}
                            >
                                <p>{user.lastname}</p>
                                <span>
                                <IoMdArrowDropdown className={classes.page__dropdown_icon} />
                                </span>
                                <Modal modalProps={{ forProfile: true, modalActive, setModalActive }}>
                                    <div className={classes.modal_wrap}>
                                        <Link to={`/user/${user.id}`} className={classes.profile_link}>
                                            <button className={classes.user_modal_button}>
                                                <img src={profile} alt="s" className={classes.user_modal_img} />
                                                <p>View Profile</p>
                                            </button>
                                        </Link>
                                        <button 
                                            className={classes.user_modal_button} 
                                            disabled={true}
                                        >
                                            <img src={settings} alt="s" className={classes.user_modal_img} />
                                            <p>Settings</p>
                                        </button>
                                        <button 
                                            className={classes.user_modal_button} 
                                            onClick={handleLogout}
                                        >
                                            <img src={logout} alt="s" className={classes.user_modal_img} />
                                            <p>Logout</p>
                                        </button>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div>
                            <Sidenav page={page} />
                        </div>
                    </div>
                </div>
            </header>
            <main className={classes.page__main}>
                <div className={classes.page__sidenav}>
                    <ErrorBoundary>
                        <Sidenav page={page} />
                    </ErrorBoundary>
                </div>
                <div className={classes.page__content_wrap}>
                    {props.children}
                </div>
            </main>
        </div>
    )
}

export default Layout