import React, { useEffect, useState } from "react";
import classes from "./Pagination.module.scss";
import useAllUsersStore from "../store/zustand/allUsersStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import uuid from "react-uuid";
import helpers from "../helpers/allHelpers";

const Pagination: React.FC = () => {

    let totalUsers = useAllUsersStore(state => state.totalUsers)
    let pageItemLimit = useAllUsersStore(state => state.pageItemLimit)
    let currentPage = useAllUsersStore(state => state.currentPage)
    let setCurrentPage = useAllUsersStore(state => state.setCurrentPage)
    let setPageItemLimit = useAllUsersStore(state => state.setPageItemLimit)

    let [disabled, setDisabled] = useState<PaginationControls>({ prev: true, next: false })

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

    const total = Math.ceil(totalUsers / Number(pageItemLimit))
    const btnArray = helpers.paginationButtons(total, currentPage)

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