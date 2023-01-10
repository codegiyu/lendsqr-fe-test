import React from "react";
import { Link } from "react-router-dom";
import classes from "./404.module.scss";


const NoPage = () => {
    return (
        <div className={classes.nopage_box}>
            <div>
                <h1>404</h1>
                <p className={classes.nopage_text}>The page you are looking for does not exist!</p>
                <Link to={"/"} className={classes.nopage_link}>
                    <p>Back to Home</p>
                </Link>
            </div>
        </div>
    )
}

export default NoPage