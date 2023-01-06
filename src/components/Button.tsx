import React from "react";
import classes from "./Button.module.scss";

interface Obj {
    text: string; 
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
}

interface Props {
    btnProps: Obj;
}

const Button: React.FC<Props> = (props) => {
    let {text, type = "button", disabled = false} = props.btnProps

    return (
        <button type={ type } className={classes.button} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button