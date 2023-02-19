import React, { useState } from "react";
import classes from "./Login.module.scss";
import logo from "../images/logo.svg";
import lendsqr from "../images/lendsqr.svg";
import background from "../images/sign-in.svg";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useUserStore from "../store/zustand/userStore";
import useAlertStore from "../store/zustand/alertStore";

const Login: React.FC = () => {
    let navigate: NavigateFunction = useNavigate()
    let [values, setValues] = useState<LoginFormValues>({email: "", password: ""})

    let isLoggedIn = useUserStore(state => state.isLoggedIn)
    let setUser = useUserStore(state => state.setUser)
    const setAlert = useAlertStore(state => state.setAlert)

    const checkLoginStatus = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isLoggedIn) {
            e.preventDefault()
            setAlert({ message: "You must log in to access home", type: "warning" })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevState: LoginFormValues) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        let num: number = Math.ceil(Math.random() * 100)
        let enteredId = Number(values.password)

        if (enteredId >= 1 && enteredId <= 100) {
            num = enteredId
        }

        fetch(`https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${num}`)
        .then(response => {
            if (response.status === 200) {
                return response.text()
            }
            throw new Error(response.statusText)
        })
        .then(jsonres => {
            let result: CompleteUser = JSON.parse(jsonres)

            let userObj: User = {
                firstname: result.profile.firstName,
                lastname: result.profile.lastName,
                avatar: result.profile.avatar,
                id: result.id,
                email: result.email
            }

            setUser(userObj)
            setAlert({ 
                message: `Welcome back, ${userObj.firstname} ${userObj.lastname}`, 
                type: "success" 
            })
            navigate("/", {replace: true})
        })
        .catch(error => {
            setAlert({ 
                message: error.message, 
                type: "error" 
            })
        })
        
    }

    let emailProps = {
        name: "email", 
        type: "email",
        placeholder: "Email", 
        value: values.email, 
        handleChange
    }

    let passwordProps = {
        name: "password", 
        type: "password",
        placeholder: "Password",
        passwordVisibilityToggle: true, 
        value: values.password, 
        handleChange
    }

    let buttonProps = {
        text: "Log In",
    }

    return (
        <div className={classes.login__body}>
            <header className={classes.login__header}>
                <Link to="/" onClick={checkLoginStatus}>
                    <div className={classes.logo__wrap}>
                        <img src={ logo } alt="logo" className={classes.logo} />
                        <img src={ lendsqr } alt="lendsqr" className={classes.logotext} />
                    </div>
                </Link>
            </header>
            <main className={classes.login__main}>
                <div className={classes.login__img_section}>
                    <img src={ background } alt="background" className={classes.login__hero} />
                </div>
                <div className={classes.login__form_section}>
                    <form className={classes.login__form} onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                        <h1 className={classes.form__header}>Welcome!</h1>
                        <p className={classes.form__instruction}>Enter details to login.</p>
                        <div className={classes.form__input_wrap}>
                            <ErrorBoundary>
                                <Input propsObj={emailProps} />
                            </ErrorBoundary>
                        </div>
                        <div className={classes.form__input_wrap}>
                            <ErrorBoundary>
                                <Input propsObj={passwordProps} />
                            </ErrorBoundary>
                        </div>
                        <Link to="#" className={classes.forgot_password}>
                            <p>Forgot Password?</p>
                        </Link>
                        <div className={classes.form__button_wrap}>
                            <ErrorBoundary>
                                <Button propsObj={buttonProps} />
                            </ErrorBoundary>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Login