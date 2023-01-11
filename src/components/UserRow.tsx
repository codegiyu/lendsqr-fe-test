import React, { useState, useEffect } from "react";
import classes from "./UserRow.module.scss";
import { HiDotsVertical, HiOutlineEye } from "react-icons/hi";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import activate from "../images/activate.svg";
import blacklist from "../images/blacklist.svg";
import useAllUsersStore from "../store/zustand/allUsersStore";
import { Link } from "react-router-dom";

export const stringDate = (str: string | undefined) => {
    if (str) {
        let date = new Date(str)
    
        let day: string[] | string = date.toString().slice(4, 15).split("")
        day.splice(6, 0, ",")
        day = day.join("")
    
        let time: string[] | string = date.toLocaleTimeString().split("")
        time.splice(-6, 3)
        time = time.join("")
    
        return day + " " + time
    }
    return "nil"
}

const formatOrgName = (name: string | undefined) => {
    if (name) {
        return name[0].toUpperCase() + name.slice(1)
    }
    return "nil"
}

export const formatPhone = (phone: string | undefined) => {
    if (phone) {
        let formattedPhone = phone.split("x")[0]
        return formattedPhone.replaceAll(".", "-")
    }
    return "nil"
}

export interface UserRowData {
    id: string;
    orgName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    status: string[];
}

interface Props {
    userData: UserRowData;
}

export interface Disabled {
    activate: boolean;
    blacklist: boolean;
}

const UserRow: React.FC<Props> = (props) => {
    let {id, orgName, firstName, lastName, email, phoneNumber, createdAt, status} = props.userData

    const activateUser = useAllUsersStore(state => state.activateUser)
    const blacklistUser = useAllUsersStore(state => state.blacklistUser)

    let [modalActive, setModalActive] = useState<boolean>(false)
    let [disabled, setDisabled] = useState<Disabled>({ activate: true, blacklist: false })

    const handleDotsClick = () => {
        setModalActive((prevState: boolean) => !prevState)
    }

    const handleActivate = () => {
        activateUser(id)
    }

    const handleBlacklist = () => {
        blacklistUser(id)
    }

    useEffect(() => {
        if (status[0] === "Blacklisted") {
            setDisabled({ activate: false, blacklist: true })
        } else {
            setDisabled({ activate: true, blacklist: false })
        }
    }, [status])

    return (
        <tr >
            <td >
                <p >{formatOrgName(orgName.split("-")[0])}</p>
            </td>
            <td >
                <p >{`${firstName} ${lastName}`}</p>
            </td>
            <td >
                <p >{email}</p>
            </td>
            <td >
                <p >{formatPhone(phoneNumber)}</p>
            </td>
            <td >
                <p >{stringDate(createdAt)}</p>
            </td>
            <td >
                { status[0] === "Blacklisted" ? (
                    <span className={classes.status_blacklisted}>{status[0]}</span>
                ) : status[0] === "Active" ? (
                    <span className={classes.status_active}>{status[0]}</span>
                ) : status[0] === "Inactive" ? (
                    <span className={classes.status_inactive}>{status[0]}</span>
                ) : status[0] === "Pending" ? (
                    <span className={classes.status_pending}>{status[0]}</span>
                ) : null

                }
            </td>
            <td  className={classes.button_cell}>
                <button className={classes.dots_button} onClick={handleDotsClick}>
                    <HiDotsVertical className={classes.dots_icon} />
                </button>
                <ErrorBoundary>
                    <Modal modalProps={{modalActive, setModalActive}}>
                        <div className={classes.modal_wrap}>
                            <Link to={`/user/${id}`} className={classes.modal_link}>
                                <button className={classes.user_modal_button}>
                                    <HiOutlineEye className={classes.user_modal_icon} />
                                    <p>View Details</p>
                                </button>
                            </Link>
                            <button 
                                className={classes.user_modal_button} 
                                disabled={disabled.blacklist}
                                onClick={handleBlacklist}
                            >
                                <img src={blacklist} alt="s" className={classes.user_modal_img} />
                                <p>Blacklist User</p>
                            </button>
                            <button 
                                className={classes.user_modal_button} 
                                disabled={disabled.activate}
                                onClick={handleActivate}
                            >
                                <img src={activate} alt="s" className={classes.user_modal_img} />
                                <p>Activate User</p>
                            </button>
                        </div>
                    </Modal>
                </ErrorBoundary>
            </td>
        </tr>
    )
}

export default UserRow