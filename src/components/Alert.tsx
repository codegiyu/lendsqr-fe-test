import React, { useCallback, useEffect, useRef, useState } from "react";
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

    let [timeElapsed, setTimeElapsed] = useState<number>(0)

    const closeAlert = () => {
        clearAlert()
        stopTimer()
    }

    let newTimeElapsed = useRef<null | NodeJS.Timer>(null)

    const startTimer = () => {
        if (newTimeElapsed.current !== null) {
            return;
        }

        newTimeElapsed.current = setInterval(() => {
            setTimeElapsed(prevState => prevState + 10)
        }, 10)
    }

    const stopTimer = useCallback(() => {
        if (newTimeElapsed.current) {
            clearInterval(newTimeElapsed.current)
            setTimeElapsed(0)
            clearAlert()
            newTimeElapsed.current = null
        }
    }, [clearAlert])

    let alertBg = alert.type === "success" 
        ? "#23AC00" : alert.type === "info"
        ? "#213F7D" : alert.type === "warning"
        ? "#FAD200" : "#EB1414"

    let timeDifference = timeElapsed > 3000 ? 0 : timeElapsed

    let lineWidth = 100 - ((timeDifference / 3000) * 100)
        
    useEffect(() => {

        return () => {
            if (newTimeElapsed.current !== null) {
                clearInterval(newTimeElapsed.current)
            }
        }
    }, [])

    useEffect(() => {
        if (alert.message) {
            startTimer()
        }
    }, [alert.message])

    useEffect(() => {
        if (timeElapsed >= 3000) {
            stopTimer()
        }
        
    }, [timeElapsed, stopTimer])


    
    if (!alertExists) return <></>
    return (
        <div className={classes.alert__main_wrap}>
            <div className={classes.alert__line} style={{width: `${lineWidth}%`}}></div>
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
        </div>
    )
}

export default Alert