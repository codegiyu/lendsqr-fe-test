import React from "react";
import classes from "./Sidenav.module.scss";
import badge from "../images/nav-badge.svg";
import bank from "../images/nav-bank.svg";
import briefcase from "../images/nav-briefcase.svg";
import chart from "../images/nav-chart.svg";
import clipboard from "../images/nav-clipboard.svg";
import coins from "../images/nav-coins.svg";
import handshake from "../images/nav-handshake.svg";
import home from "../images/nav-home.svg";
import loan from "../images/nav-loan.svg";
import logout from "../images/nav-logout.svg";
import mangekyou from "../images/nav-mangekyou.svg";
import money from "../images/nav-money.svg";
import piggy from "../images/nav-piggy.svg";
import scroll from "../images/nav-scroll.svg";
import sliders from "../images/nav-sliders.svg";
import transactions from "../images/nav-transactions.svg";
import tyre from "../images/nav-tyre.svg";
import userCheck from "../images/nav-user-check.svg";
import userCog from "../images/nav-user-cog.svg";
import userFriends from "../images/nav-user-friends.svg";
import userTimes from "../images/nav-user-times.svg";
import users from "../images/nav-users.svg";
import useAlertStore from "../store/zustand/alertStore";
import useUserStore from "../store/zustand/userStore";
import useAllUsersStore from "../store/zustand/allUsersStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

const Sidenav: React.FC<CompWithPropsOnly<SidenavProps>> = (props) => {
    const { page } = props.propsObj
    
    let navigate = useNavigate()

    const logoutUser = useUserStore(state => state.logoutUser)
    const setAlert = useAlertStore(state => state.setAlert)
    const clearAllUsers = useAllUsersStore(state => state.clearAllUsers)

    const handleLogout = () => {
        logoutUser()
        clearAllUsers()
        setAlert({ message: "You have logged out successfully", type: "success" })
        navigate("/login", {replace: true})
        
    }

    return (
        <div className={classes.page__sidenav_wrap}>
            <div className={classes.page__organisation}>
                <span>
                    <img src={briefcase} alt="b" />
                </span>
                <div className={classes.organisation_select}>
                    <p>Switch Organisation</p>
                    <span>
                        <BiChevronDown className={classes.organisation_icon} />
                    </span>
                </div>
            </div>
            
            <div className={classes.page__dashboard}>
                <Link to="#" className={classes.page__link}>
                    <div className={ page === "Dashboard" ? classes.active_page : ""}>
                        <span>
                            <img src={home} alt="b" />
                        </span>
                        <p>Dashboard</p>
                    </div>
                </Link>
            </div>

            <p className={classes.page__category_heading}>Customers</p>
            <ul className={classes.page__sidenav_ul}>
                <Link to="/" className={classes.page__link}>
                    <li className={ page === "Users" ? classes.active_page : ""}>
                        <span>
                            <img src={users} alt="b" />
                        </span>
                        <p>Users</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Guarantors" ? classes.active_page : ""}>
                        <span>
                            <img src={userFriends} alt="b" />
                        </span>
                        <p>Guarantors</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Loans" ? classes.active_page : ""}>
                        <span>
                            <img src={money} alt="b" />
                        </span>
                        <p>Loans</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Decision Models" ? classes.active_page : ""}>
                        <span>
                            <img src={handshake} alt="b" />
                        </span>
                        <p>Decision Models</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Savings" ? classes.active_page : ""}>
                        <span>
                            <img src={piggy} alt="b" />
                        </span>
                        <p>Savings</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Loan Requests" ? classes.active_page : ""}>
                        <span>
                            <img src={loan} alt="b" />
                        </span>
                        <p>Loan Requests</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Whitelist" ? classes.active_page : ""}>
                        <span>
                            <img src={userCheck} alt="b" />
                        </span>
                        <p>Whitelist</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Karma" ? classes.active_page : ""}>
                        <span>
                            <img src={userTimes} alt="b" />
                        </span>
                        <p>Karma</p>
                    </li>
                </Link>
            </ul>

            <p className={classes.page__category_heading}>Businesses</p>
            <ul className={classes.page__sidenav_ul}>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Organization" ? classes.active_page : ""}>
                        <span>
                            <img src={briefcase} alt="b" />
                        </span>
                        <p>Organization</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Loan Products" ? classes.active_page : ""}>
                        <span>
                            <img src={loan} alt="b" />
                        </span>
                        <p>Loan Products</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Savings Products" ? classes.active_page : ""}>
                        <span>
                            <img src={bank} alt="b" />
                        </span>
                        <p>Savings Products</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Fees and Charges" ? classes.active_page : ""}>
                        <span>
                            <img src={coins} alt="b" />
                        </span>
                        <p>Fees and Charges</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Transactions" ? classes.active_page : ""}>
                        <span>
                            <img src={transactions} alt="b" />
                        </span>
                        <p>Transactions</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Services" ? classes.active_page : ""}>
                        <span>
                            <img src={mangekyou} alt="b" />
                        </span>
                        <p>Services</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Service Account" ? classes.active_page : ""}>
                        <span>
                            <img src={userCog} alt="b" />
                        </span>
                        <p>Service Account</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Settlement" ? classes.active_page : ""}>
                        <span>
                            <img src={scroll} alt="b" />
                        </span>
                        <p>Settlement</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Reports" ? classes.active_page : ""}>
                        <span>
                            <img src={chart} alt="b" />
                        </span>
                        <p>Reports</p>
                    </li>
                </Link>
            </ul>

            <p className={classes.page__category_heading}>Settings</p>
            <ul className={classes.page__sidenav_ul}>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Preferences" ? classes.active_page : ""}>
                        <span>
                            <img src={sliders} alt="b" />
                        </span>
                        <p>Preferences</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Fees and Pricing" ? classes.active_page : ""}>
                        <span>
                            <img src={badge} alt="b" />
                        </span>
                        <p>Fees and Pricing</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "Audit Logs" ? classes.active_page : ""}>
                        <span>
                            <img src={clipboard} alt="b" />
                        </span>
                        <p>Audit Logs</p>
                    </li>
                </Link>
                <Link to="#" className={classes.page__link}>
                    <li className={page === "System Messages" ? classes.active_page : ""}>
                        <span>
                            <img src={tyre} alt="b" />
                        </span>
                        <p>System Messages</p>
                    </li>
                </Link>
            </ul>
            <div className={classes.page__sidenav_end_wrap}>
                <div className={classes.page__logout_wrap} onClick={handleLogout}>
                    <span>
                        <img src={logout} alt="b" />
                    </span>
                    <p>Logout</p>
                </div>
                <p className={classes.page__version}>v1.2.0</p>
            </div>
        </div>
    )
}

export default Sidenav