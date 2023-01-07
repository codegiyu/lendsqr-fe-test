import React, { useState } from "react";
import classes from "./Input.module.scss";

interface Obj {
    name: string; 
    type: React.HTMLInputTypeAttribute | undefined; 
    placeholder: string;
    passwordVisibilityToggle?: boolean;
    value: string; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
    inputProps: Obj;
}

const Input: React.FC<Props> = (props) => {
    let {name, type, placeholder, passwordVisibilityToggle = false, value, handleChange} = props.inputProps

    let [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

    const toggleVisibility = () => {
        setPasswordVisibility((prevState: boolean) => !prevState)
    }

    if (passwordVisibilityToggle) {
        type = passwordVisibility ? "text" : "password"
    }

    if (type === "search") {
        return (
            <input 
                type={ type } 
                name={ name } 
                placeholder={ placeholder } 
                value={ value }
                className={ classes.search }
                onChange={ handleChange }
            />
        )
    }

    return (
        <div className={classes.input__wrap}>
            <input 
                type={ type } 
                name={ name } 
                placeholder={ placeholder } 
                value={ value }
                className={ classes.input }
                onChange={ handleChange }
            />
            { passwordVisibilityToggle ? (
                <div className={classes.password__toggle} onClick={toggleVisibility}>
                    <p>SHOW</p>
                </div>
            ) : null
            }
        </div>
    )
}

export default Input