import React, { useRef } from "react";
import classes from "./Modal.module.scss";

const Modal: React.FC<CompWithChildrenAndProps<ModalProps>> = (props) => {
    let modalRef = useRef<null | HTMLDivElement>(null)

    let {isFilter = false, modalActive, forProfile = false} = props.propsObj

    let modalStyle = modalActive ? {display: "block"} : {display: "none"}

    if (isFilter) {
        return (
            <div style={modalStyle} className={classes.filter_modal_box}
                ref={modalRef}
            >
                {props.children}
            </div>
        )
    }

    if (forProfile) {
        return (
            <div style={modalStyle} className={classes.profile_modal_box}
                ref={modalRef}
            >
                {props.children}
            </div>
        )
    }

    return (
        <div 
            style={modalStyle} 
            className={classes.modal_box}
            ref={modalRef}
        >
            {props.children}
        </div>
    )
}

export default Modal