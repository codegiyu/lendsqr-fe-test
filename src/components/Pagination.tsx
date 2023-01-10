import React, { useEffect, useState } from "react";
import classes from "./Pagination.module.scss";
import useAllUsersStore from "../store/zustand/allUsersStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import uuid from "react-uuid";


const buttons = (total: number, current: number) => {
    let arr = Array(7).fill("0")
    arr[0] = "1"
    arr[6] = String(total)

    if (total <= 7) return Array(total).fill("").map((item, idx) => item + ++idx)

    if (current === 1 || current === 2) {
        arr[1] = "2"
        arr[2] = "3"
        arr[3] = "..."
        arr[4] = String(total - 2)
        arr[5] = String(total - 1)
    }

    if (current === 3) {
        arr[1] = "2"
        arr[2] = "3"
        arr[3] = "4"
        arr[4] = "..."
        arr[5] = String(total - 1)
    }

    if (current > 3 && current < total - 2) {
        arr[1] = "..."
        arr[2] = String(current - 1)
        arr[3] = String(current)
        arr[4] = String(current + 1)
        arr[5] = "..."
    }

    if (current === total - 2) {
        arr[1] = "2"
        arr[2] = "..."
        arr[3] = String(total - 3)
        arr[4] = String(total - 2)
        arr[5] = String(total - 1)
    }

    if (current === total || current === total - 1) {
        arr[1] = "2"
        arr[2] = "3"
        arr[3] = "..."
        arr[4] = String(total - 2)
        arr[5] = String(total - 1)
    }

    return arr
}

interface Disabled {
    prev: boolean;
    next: boolean;
}

const Pagination: React.FC = () => {

    let totalUsers = useAllUsersStore(state => state.totalUsers)
    let pageItemLimit = useAllUsersStore(state => state.pageItemLimit)
    let currentPage = useAllUsersStore(state => state.currentPage)
    let setCurrentPage = useAllUsersStore(state => state.setCurrentPage)
    let setPageItemLimit = useAllUsersStore(state => state.setPageItemLimit)

    let [disabled, setDisabled] = useState<Disabled>({ prev: true, next: false })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageItemLimit(e.target.value)
    }

    const handleSetPage = (num: number) => {
        setCurrentPage(num)
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    let total = Math.ceil(totalUsers / Number(pageItemLimit))
    let btnArray = buttons(total, currentPage)

    useEffect(() => {
        if (currentPage === 1 && !disabled.prev) {
            setDisabled((prevState) => {
                return { ...prevState, prev: true }
            })
        } else if (currentPage !== 1 && disabled.prev) {
            setDisabled((prevState) => {
                return { ...prevState, prev: false }
            })
        }

        if (currentPage === total && !disabled.next) {
            setDisabled((prevState) => {
                return { ...prevState, next: true }
            })
        } else if (currentPage !== total && disabled.next) {
            setDisabled((prevState) => {
                return { ...prevState, next: false }
            })
        }
    }, [currentPage, disabled, total])

    return (
        <section className={classes.pagination_wrap}>
            <div className={classes.showing_wrap}>
                <p>Showing</p>
                <select 
                    name="pagination_number" 
                    id="pagination_number" 
                    defaultValue={pageItemLimit}
                    onChange={handleChange}
                >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <p>{`out of ${totalUsers}`}</p>
            </div>
            <div className={classes.buttons_wrap}>
                <button 
                    className={classes.directional_buttons}
                    onClick={handlePrevPage}
                    disabled={disabled.prev}
                >
                    <span>
                        <FaChevronLeft className={classes.page_icons} />
                    </span>
                </button>
                <div className={classes.page_buttons_wrap}>
                    { btnArray.map(item => {
                        if (item === String(currentPage)) {
                            return (
                                <button 
                                    key={uuid()}
                                    className={classes.selected_page_btn}
                                >
                                    {item}
                                </button>
                            )
                        }

                        if (item === "...") {
                            return (
                                <button 
                                    key={uuid()}
                                    className={classes.no_page_btn}
                                    disabled={true}
                                >
                                    {item}
                                </button>
                            )
                        }

                        return (
                            <button 
                                key={uuid()}
                                className={classes.page_buttons}
                                onClick={() => handleSetPage(Number(item))}
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>
                <button 
                    className={classes.directional_buttons}
                    onClick={handleNextPage}
                    disabled={disabled.next}
                >
                    <span>
                        <FaChevronRight className={classes.page_icons} />
                    </span>
                </button>
            </div>
        </section>
    )
}

export default Pagination