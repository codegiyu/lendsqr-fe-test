import React, { useState } from "react";
import classes from "./Login.module.scss";
import logo from "../images/logo.svg";
import lendsqr from "../images/lendsqr.svg";
import background from "../images/sign-in.svg";
import ErrorBoundary from "../components/ErrorBoundary";
import Input from "../components/Input";
import Button from "../components/Button";

interface Value {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    let [values, setValues] = useState<Value>({email: "", password: ""})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevState: Value) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    
    const handleSubmit = () => {

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
        value: values.password, 
        handleChange
    }

    let buttonProps = {
        text: "Log In",
    }

    return (
        <div className={classes.login__body}>
            <header className={classes.login__header}>
                <div className={classes.logo__wrap}>
                    <img src={ logo } alt="logo" className={classes.logo} />
                    <img src={ lendsqr } alt="lendsqr" className={classes.logotext} />
                </div>
            </header>
            <main className={classes.login__main}>
                <div className={classes.login__img_section}>
                    <img src={ background } alt="background" className={classes.login__hero} />
                </div>
                <div className={classes.login__form_section}>
                    <form className={classes.login__form} onSubmit={handleSubmit}>
                        <h1 className={classes.form__header}>Welcome!</h1>
                        <p className={classes.form__instruction}>Enter details to login.</p>
                        <div className={classes.form__input_wrap}>
                            <ErrorBoundary>
                                <Input inputProps={emailProps} />
                            </ErrorBoundary>
                        </div>
                        <div className={classes.form__input_wrap}>
                            <ErrorBoundary>
                                <Input inputProps={passwordProps} />
                            </ErrorBoundary>
                        </div>
                        <p className={classes.forgot_password}>Forgot Password?</p>
                        <div className={classes.form__button_wrap}>
                            <ErrorBoundary>
                                <Button btnProps={buttonProps} />
                            </ErrorBoundary>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Login