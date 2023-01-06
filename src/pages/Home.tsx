import React, { useEffect } from "react";
import classes from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import useUserStore from '../store/zustand/userStore';
import Layout from "../layout/Layout";


const Home: React.FC = () => {
    let navigate = useNavigate()
    const isLoggedIn = useUserStore(state => state.isLoggedIn)

    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    })
    
    return (
        <Layout>
            <section className={classes.home__content_wrap}>

            </section>
        </Layout>
    )
}

export default Home