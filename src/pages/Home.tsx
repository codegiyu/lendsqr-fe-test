import React, { useEffect } from "react";
import classes from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import useUserStore from '../store/zustand/userStore';
import Layout from "../layout/Layout";
import useAlertStore from "../store/zustand/alertStore";


const Home: React.FC = () => {
    let navigate = useNavigate()
    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const setAlert = useAlertStore(state => state.setAlert)

    
    useEffect(() => {
        if (!isLoggedIn) {
            setAlert({ message: "You must be logged in to view this page", type: "error" })
            navigate("/login")
        }
    })
    
    return (
        <Layout layoutProps={{ page: "Users" }}>
            <section className={classes.home__content_wrap}>

            </section>
        </Layout>
    )
}

export default Home