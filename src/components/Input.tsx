import React from "react";
import classes from "./Input.module.scss";

interface Obj {
    name: string; 
    type: React.HTMLInputTypeAttribute | undefined; 
    placeholder: string; 
    value: string; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
    inputProps: Obj;
}

const Input: React.FC<Props> = (props) => {
    let {name, type, placeholder, value, handleChange} = props.inputProps

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
            { type === "password" ? (
                <div className={classes.password__toggle}>
                    <p>SHOW</p>
                </div>
            ) : null
            }
        </div>
    )
}

export default Input