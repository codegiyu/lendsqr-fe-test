import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Layout.module.scss";
import logo from "../images/logo.svg";
import lendsqr from "../images/lendsqr.svg";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/Input";
import { TbSearch } from "react-icons/tb";
import { IoIosNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";
import Button from "../components/Button";
import useUserStore from "../store/zustand/userStore";
import Sidenav from "../components/Sidenav";


interface layoutProps {
    page: string;
}

interface Props {
    layoutProps: layoutProps;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    let {page} = props.layoutProps

    let [value, setValue] = useState<string>("")

    let user = useUserStore(state => state.user)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setValue("")
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