import React from "react";
import classes from "./DetailsBlock.module.scss";


interface BlockProps {
    heading: string;
}

interface Props {
    blockProps: BlockProps;
    children: React.ReactNode;
}

const DetailsBlock: React.FC<Props> = (props) => {
    let {heading} = props.blockProps

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