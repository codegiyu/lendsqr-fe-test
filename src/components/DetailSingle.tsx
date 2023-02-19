import React from "react";
import classes from "./DetailSingle.module.scss";

const DetailSingle: React.FC<CompWithPropsOnly<DetailSingleProps>> = (props) => {
    let {title, value} = props.propsObj

    return (
        <div className={classes.detail_wrap}>
            <p className={classes.detail_title}>{title}</p>
            <p className={classes.detail_value}>{value}</p>
        </div>
    )
}

export default DetailSingle