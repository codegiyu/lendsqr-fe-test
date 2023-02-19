import React from "react";
import classes from "./DetailsBlock.module.scss";

const DetailsBlock: React.FC<CompWithChildrenAndProps<DetailsBlockProps>> = (props) => {
    let {heading} = props.propsObj

    return (
        <section className={classes.details_block_wrap}>
            <h6 className={classes.block_title}>{heading}</h6>
            <div className={classes.block_details_wrap}>
                {props.children}
            </div>
        </section>
    )
}

export default DetailsBlock