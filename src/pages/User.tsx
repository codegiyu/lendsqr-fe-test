import React, { useCallback, useEffect, useState } from "react";
import classes from "./User.module.scss";
import Layout from "../layout/Layout";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import useUserStore from "../store/zustand/userStore";
import useAlertStore from "../store/zustand/alertStore";
import useAllUsersStore from "../store/zustand/allUsersStore";
import ErrorBoundary from "../components/ErrorBoundary";
import { HiArrowLongLeft } from "react-icons/hi2";
import uuid from "react-uuid";
import { GhostButton } from "../components/Button";
import star from "../images/star-full.svg";
import noStar from "../images/star.svg";
import DetailSingle from "../components/DetailSingle";
import DetailsBlock from "../components/DetailsBlock";
import helpers from "../helpers/allHelpers";

const User: React.FC = () => {
    let navigate: NavigateFunction = useNavigate()
    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const setAlert = useAlertStore(state => state.setAlert)
    const allUsers = useAllUsersStore(state => state.allUsers)
    const activateUser = useAllUsersStore(state => state.activateUser)
    const blacklistUser = useAllUsersStore(state => state.blacklistUser)

    const { id } = useParams()

    let [pageData, setPageData] = useState<StatusedUser | null | undefined>(null)
    let [disabled, setDisabled] = useState<UserRowOptionsButtonsDisabledState>({ activate: true, blacklist: false })

    const updatePageData = useCallback(() => {
        const userData: StatusedUser | null | undefined = allUsers !== null
            ? allUsers.find(item => item.id === id)
            : null
        console.log(userData?.status)
        if (userData) {
            if (userData.status[0] === "Blacklisted") {
                console.log("Blacklisted")
                setDisabled({ activate: false, blacklist: true })
            } else {
                console.log("activated")
                setDisabled({ activate: true, blacklist: false })
            }
        }
        setPageData(userData)
    }, [allUsers, id])

    const handleActivate = () => {
        if (pageData) {
            activateUser(pageData?.id)
            updatePageData()
        }
    }

    const handleBlacklist = () => {
        if (pageData) {
            blacklistUser(pageData?.id)
            updatePageData()
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setAlert({ message: "You must be logged in to view this page", type: "error" })
            navigate("/login")
        }
    })

    useEffect(() => {
        updatePageData()
    }, [id, allUsers, updatePageData])

    let activateBtnObj: GhostBtnProps = {
        text: "Activate User",
        type: "button",
        color: "teal",
        disabled: disabled.activate,
        handleClick: handleActivate
    }

    let blacklistBtnObj: GhostBtnProps = {
        text: "Blacklist User",
        type: "button",
        color: "red",
        disabled: disabled.blacklist,
        handleClick: handleBlacklist
    }

    let details = {
        personal: [
            {
                title: "Full Name",
                value: `${pageData?.profile.firstName} ${pageData?.profile.lastName}`
            },
            {
                title: "Phone Number",
                value: helpers.formatPhone(pageData?.phoneNumber)
            },
            {
                title: "Email Address",
                value: pageData?.email
            },
            {
                title: "BVN",
                value: pageData?.profile.bvn
            },
            {
                title: "Gender",
                value: pageData?.profile.gender
            },
            {
                title: "Marital Status",
                value: pageData?.education.employmentStatus === "Employed" ? "Married" : "Single"
            },
            {
                title: "Children",
                value: "None"
            },
            {
                title: "Type of Residence",
                value: Number(pageData?.accountBalance) < 400 ? "Parent's Apartment" : "Personal Apartment"
            }
        ],
        education: [
            {
                title: "Level of Education",
                value: pageData?.education.level
            },
            {
                title: "Employment Status",
                value: pageData?.education.employmentStatus
            },
            {
                title: "Sector of Employment",
                value: pageData?.education.sector
            },
            {
                title: "Duration of Employment",
                value: pageData?.education.duration
            },
            {
                title: "Office Email",
                value: pageData?.education.officeEmail
            },
            {
                title: "Monthly Income",
                value: helpers.getIncome(pageData?.education.monthlyIncome)
            },
            {
                title: "Loan Repayment",
                value: `???${pageData?.education.loanRepayment}`
            }
        ],
        social: [
            {
                title: "Twitter",
                value: pageData?.socials.twitter
            },
            {
                title: "Facebook",
                value: pageData?.socials.facebook
            },
            {
                title: "Instagram",
                value: pageData?.socials.instagram
            }
        ],
        guarantor: [
            {
                title: "Name",
                value: `${pageData?.guarantor.firstName} ${pageData?.guarantor.lastName}`
            },
            {
                title: "Phone Number",
                value: helpers.formatPhone(pageData?.guarantor.phoneNumber)
            },
            {
                title: "Email",
                value: "Nil"
            },
            {
                title: "Relationship",
                value: "Friend"
            }
        ]
    }
    
    return (
        <Layout propsObj={{ page: "Users" }}>
            <section className={classes.users__content_wrap}>
                <Link to="/" className={classes.back_button_link}>
                    <div className={classes.back_button_wrap}>
                        <span>
                            <HiArrowLongLeft className={classes.back_arrow} />
                        </span>
                        <p>Back to Users</p>
                    </div>
                </Link>
                <div className={classes.page_heading_wrap}>
                    <h1 className={classes.users__heading}>User Details</h1>
                    <div className={classes.heading_btns_wrap}>
                        <GhostButton propsObj={blacklistBtnObj} />
                        <GhostButton propsObj={activateBtnObj} />
                    </div>
                </div>

                <section className={classes.details_heading_box}>
                    <div className={classes.details_heading_wrap}>
                        <div className={classes.profile_details}>
                            <img src={pageData?.profile.avatar} alt={pageData?.profile.lastName} className={classes.profile_image} />
                            <div className={classes.profile_text}>
                                <p className={classes.profile_name}>{`${pageData?.profile.firstName} ${pageData?.profile.lastName}`}</p>
                                <p className={classes.profile_account}>{pageData?.accountNumber}</p>
                            </div>
                        </div>
                        <div className={classes.other_details}>
                            <div className={classes.tier_details}>
                                <p>User Tier</p>
                                <div className={classes.tier_stars}>
                                {
                                    pageData?.status.includes("Pending") ? (
                                        <>
                                            <img src={star} alt="s" className={classes.star} />
                                            <img src={noStar} alt="s" className={classes.star} />
                                            <img src={noStar} alt="s" className={classes.star} />
                                        </>
                                    ) : pageData?.status.includes("Inactive") ? (
                                        <>
                                            <img src={star} alt="s" className={classes.star} />
                                            <img src={star} alt="s" className={classes.star} />
                                            <img src={noStar} alt="s" className={classes.star} />
                                        </>
                                    ) : pageData?.status.includes("Active") ? (
                                        <>
                                            <img src={star} alt="s" className={classes.star} />
                                            <img src={star} alt="s" className={classes.star} />
                                            <img src={star} alt="s" className={classes.star} />
                                        </>
                                    ) : null
                                }
                                </div>
                            </div>
                            <div className={classes.bank_details}>
                                <p className={classes.bank_balance}>{`???${pageData?.accountBalance}`}</p>
                                <p className={classes.bank_account}>{`${helpers.generateAccount(pageData?.accountNumber)}/Providus Bank`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.scroll_wrap}>
                        <div className={classes.details_tabs_wrap}>
                            <p className={classes.selected_tab}>General Details</p>
                            <p>Documents</p>
                            <p>Bank Details</p>
                            <p>Loans</p>
                            <p>Savings</p>
                            <p>App and System</p>
                        </div>
                    </div>
                </section>

                <section className={classes.general_details_tab}>
                    <ErrorBoundary>
                        <DetailsBlock propsObj={{ heading: "Personal Information"}}>
                            { details.personal.map(item => <DetailSingle key={uuid()} propsObj={item} />)}
                        </DetailsBlock>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <DetailsBlock propsObj={{ heading: "Education and Employment"}}>
                            { details.education.map(item => <DetailSingle key={uuid()} propsObj={item} />)}
                        </DetailsBlock>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <DetailsBlock propsObj={{ heading: "Socials"}}>
                            { details.social.map(item => <DetailSingle key={uuid()} propsObj={item} />)}
                        </DetailsBlock>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <DetailsBlock propsObj={{ heading: "Guarantor"}}>
                            { details.guarantor.map(item => <DetailSingle key={uuid()} propsObj={item} />)}
                        </DetailsBlock>
                    </ErrorBoundary>
                </section>
            </section>
        </Layout>
    )
}

export default User