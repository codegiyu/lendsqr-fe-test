import React, { useState, useEffect } from "react";
import classes from "./UserRow.module.scss";
import { HiDotsVertical, HiOutlineEye } from "react-icons/hi";
import Modal from "./Modal";
import activate from "../images/activate.svg";
import blacklist from "../images/blacklist.svg";
import useAllUsersStore from "../store/zustand/allUsersStore";
import { Link } from "react-router-dom";
import helpers from "../helpers/allHelpers";

const UserRow: React.FC<CompWithPropsOnly<UserRowData>> = (props) => {
    let {id, orgName, firstName, lastName, email, phoneNumber, createdAt, status} = props.propsObj

    const activateUser = useAllUsersStore(state => state.activateUser)
    const blacklistUser = useAllUsersStore(state => state.blacklistUser)

    let [modalActive, setModalActive] = useState<boolean>(false)
    let [disabled, setDisabled] = useState<UserRowOptionsButtonsDisabledState>({ activate: true, blacklist: false })

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
                <p >{helpers.formatOrgName(orgName.split("-")[0])}</p>
            </td>
            <td >
                <p >{`${firstName} ${lastName}`}</p>
            </td>
            <td >
                <p >{email}</p>
            </td>
            <td >
                <p >{helpers.formatPhone(phoneNumber)}</p>
            </td>
            <td >
                <p >{helpers.stringDate(createdAt)}</p>
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
                <button className={classes.dots_button} onClick={handleDotsClick} >
                    <HiDotsVertical className={classes.dots_icon} />
                </button>
                <Modal propsObj={{modalActive, setModalActive}}>
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
            </td>
        </tr>
    )
}

export default UserRow