import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import useUserStore from '../store/zustand/userStore';


const Home: React.FC = () => {
    let navigate = useNavigate()
    const isLoggedIn = useUserStore(state => state.isLoggedIn)

    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    })
    
    return (
        <div className={styles.home__body} >

        </div>
    )
}

export default Home