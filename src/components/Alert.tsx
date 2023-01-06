import React from "react";
import classes from "./Alert.module.scss";
import useAlertStore from "../store/zustand/alertStore";
import { IoClose } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";


const Alert: React.FC = () => {
    let alertExists = useAlertStore(state => state.alertExists)
    let alert = useAlertStore(state => state.alert)
    const clearAlert = useAlertStore(state => state.clearAlert)

    const closeAlert = () => {
        clearAlert()
    }

    let alertBg = alert.type === "success" 
        ? "#23AC00" : alert.type === "info"
        ? "#213F7D" : alert.type === "warning"
        ? "#FAD200" : "#EB1414"

    
    if (!alertExists) return <></>
    return (
        <div className={classes.alert__wrap}>
            <div style={{ background: alertBg }} className={classes.type_wrap}>
                <span>
                    {
                        alert.type === "success" ? (
                            <BsCheck2Circle className={classes.alert_icon} />
                        ) : alert.type === "info" ? (
                            <MdOutlineNoteAlt className={classes.alert_icon} />
                        ) : alert.type === "warning" ? (
                            <RiErrorWarningLine className={classes.alert_icon} />
                        ) : <BiError className={classes.alert_icon} />
                    }
                </span>
            </div>
            <div className={classes.message_wrap}>
                <p>{ alert.message }</p>
            </div>
            <div className={classes.close_wrap}>
                <span onClick={closeAlert}>
                    <IoClose className={classes.close_icon} />
                </span>
            </div>
        </div>
    )
}

export default Alert