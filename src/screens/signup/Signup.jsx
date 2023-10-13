import React from 'react'
import styles from "./Signup.module.css"
import LogoComponent from "../../components/logo/Logo"
import EndContainerComponent from '../../components/endContainer/EndContainer'

const Signup = () => {
  return (
    <>
    <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
            <LogoComponent/>
            <div className={styles.signupForm}></div>
            <div className={styles.loginLink}></div>
        </div>
        <EndContainerComponent/>
    </div>
    </>
  )
}

export default Signup