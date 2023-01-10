import React from "react";
import classes from "./Button.module.scss";

interface BtnObj {
    text?: string; 
    type?: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
    fromFilter?: boolean
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface Props {
    btnProps: BtnObj;
    children?: React.ReactNode
}

export interface Ghost extends BtnObj {
    color: string;
}

interface GhostProps {
    btnProps: Ghost;
}

export const GhostButton: React.FC<GhostProps> = (props) => {
    let {text, type = "button", disabled = false, handleClick, color} = props.btnProps

    if (color === "teal") {
        return (
            <button className={classes.teal_ghost_btn} 
                type={type} 
                disabled={disabled} 
                onClick={handleClick}
            >
                {text}
            </button>
        )
    }

    if (color === "red") {
        return (
            <button className={classes.red_ghost_btn} 
                type={type} 
                disabled={disabled} 
                onClick={handleClick}
            >
                {text}
            </button>
        )
    }

    return (
        <button className={classes.grey_ghost_btn} 
            type={type} 
            disabled={disabled} 
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

const Button: React.FC<Props> = (props) => {
    let {text, type = "submit", disabled = false, fromFilter = false} = props.btnProps

    if(!text) {
        return (
            <button type={ type } className={classes.button_with_icon} disabled={disabled}>
                {props.children}
            </button>
        )
    }

    if (fromFilter) {
        return (
            <button type={ type } className={classes.filter_button} disabled={disabled}>
                {text}
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