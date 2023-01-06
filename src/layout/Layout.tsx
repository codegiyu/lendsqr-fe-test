import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Layout.module.scss";
import logo from "../images/logo.svg";
import lendsqr from "../images/lendsqr.svg";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/Input";
import { TbSearch } from "react-icons/tb";
import { IoIosNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";
// import { TbSearch } from "react-icons/tb";
import Button from "../components/Button";
import useUserStore from "../store/zustand/userStore";


interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    let [value, setValue] = useState<string>("")

    let user = useUserStore(state => state.user)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
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
                    <form className={classes.search_form} onChange={handleSubmit}>
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
                        <div className={classes.page__dropdown}>
                            <p>{user.lastname}</p>
                            <span>
                            <IoMdArrowDropdown className={classes.page__dropdown_icon} />
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main className={classes.page__main}>
                <div className={classes.page__sidenav}>
                    <div className={classes.page__sidenav_wrap}>
                        <div className={classes.page__organisation}>
                            <span></span>
                            <p>Switch Organisation</p>
                            <span></span>
                        </div>
                        
                        <div className={classes.page__dashboard}>
                            <span></span>
                            <p>Dashboard</p>
                        </div>

                        <p className={classes.page__category_heading}>Customers</p>
                        <ul className={classes.page__sidenav_ul}>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Users</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Guarantors</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Loans</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Decision Models</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Savings</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Loan Requests</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Whitelist</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Karma</p>
                            </li>
                        </ul>

                        <p className={classes.page__category_heading}>Businesses</p>
                        <ul className={classes.page__sidenav_ul}>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Organization</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Loan Products</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Savings Products</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Fees and Charges</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Transactions</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Services</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Service Account</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Settlement</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Reports</p>
                            </li>
                        </ul>

                        <p className={classes.page__category_heading}>Settings</p>
                        <ul className={classes.page__sidenav_ul}>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Preferences</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Fees and Pricing</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>Audit Logs</p>
                            </li>
                            <li className={classes.page__li}>
                                <span></span>
                                <p>System Messages</p>
                            </li>
                        </ul>
                        <div className={classes.page__sidenav_end_wrap}>
                            <div className={classes.page__logout_wrap}>
                                <span></span>
                                <p>Logout</p>
                            </div>
                            <p className={classes.page__version}>v1.2.0</p>
                        </div>
                    </div>
                </div>
                <div className={classes.page__content_wrap}>
                    {props.children}
                </div>
            </main>
        </div>
    )
}

export default Layout