import React, { useState } from "react";
import classes from "./Input.module.scss";
import uuid from "react-uuid";

interface Obj {
    name: string; 
    type: React.HTMLInputTypeAttribute | undefined; 
    placeholder: string;
    passwordVisibilityToggle?: boolean;
    value: string; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fromFilter?: boolean;
}

interface Props {
    inputProps: Obj;
}

interface SelectObj {
    name: string;
    value: string;
    options: string[][];
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface SelectProps {
    selectObj: SelectObj
}

export const Select: React.FC<SelectProps> = (props) => {
    let {name, value, options, handleSelectChange} = props.selectObj

    let label = name[0].toUpperCase() + name.slice(1)

    return (
        <div>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <select className={classes.select} name={name} value={value} onChange={handleSelectChange}>
                {options.map(item => <option key={uuid()} value={item[0]}>{item[1]}</option>)}
            </select>
        </div>
    )
}

const Input: React.FC<Props> = (props) => {
    let {name, type, placeholder, passwordVisibilityToggle = false, value, handleChange, fromFilter = false} = props.inputProps

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

    if (fromFilter) {
        let label = name !== "phone" ? name[0].toUpperCase() + name.slice(1) : "Phone Number"
        return (
            <>
                <label className={classes.label} htmlFor={name}>{label}</label>
                <input 
                    type={ type } 
                    name={ name } 
                    placeholder={ placeholder } 
                    value={ value }
                    className={ classes.filter_inputs }
                    onChange={ handleChange }
                />
            </>
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