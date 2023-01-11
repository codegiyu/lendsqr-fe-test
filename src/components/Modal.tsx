import React, { useRef } from "react";
import classes from "./Modal.module.scss";

interface ModalProps {
    isFilter?: boolean;
    forProfile?: boolean;
    modalActive: boolean;
    setModalActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
    modalProps: ModalProps;
    children: React.ReactNode;
}


const Modal: React.FC<Props> = (props) => {
    let modalRef = useRef<null | HTMLDivElement>(null)

    let {isFilter = false, modalActive, forProfile = false} = props.modalProps

    let modalStyle = modalActive ? {display: "block"} : {display: "none"}

    // const handleBlur = () => {
    //     setModalActive(false)
    // }

    // useEffect(() => {
    //     if (modalActive) {
    //         modalRef.current?.focus()
    //     }
    // }, [modalActive])

    if (isFilter) {
        return (
            <div style={modalStyle} className={classes.filter_modal_box} 
                // onBlur={handleBlur}
                ref={modalRef}
            >
                {props.children}
            </div>
        )
    }

    if (forProfile) {
        return (
            <div style={modalStyle} className={classes.profile_modal_box} 
                // onBlur={handleBlur}
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
            // onBlur={handleBlur}
            ref={modalRef}
        >
            {props.children}
        </div>
    )
}

export default Modal