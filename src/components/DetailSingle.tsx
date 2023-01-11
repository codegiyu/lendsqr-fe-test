import React from "react";
import classes from "./DetailSingle.module.scss";


interface DetailProps {
    title: string;
    value: string | undefined;
}

interface Props {
    detailProps: DetailProps;
}

const DetailSingle: React.FC<Props> = (props) => {
    let {title, value} = props.detailProps

    return (
        <div className={classes.detail_wrap}>
            <p className={classes.detail_title}>{title}</p>
            <p className={classes.detail_value}>{value}</p>
        </div>
    )
}

export default DetailSingle