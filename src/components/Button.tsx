import React from "react";
import classes from "./Button.module.scss";

interface Obj {
    text?: string; 
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface Props {
    btnProps: Obj;
    children?: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
    let {text, type = "submit", disabled = false} = props.btnProps

    if(!text) {
        return (
            <button type={ type } className={classes.button_with_icon} disabled={disabled}>
                {props.children}
            </button>
        )
    }

    return (
        <button type={ type } className={classes.button} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button