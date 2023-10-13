import React from 'react'
import styles from "./Signup.module.css"
// import Logo from "../../assets/images/beatbox-logo.png"

const Signup = () => {
  return (
    <>
    <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
            <div className={styles.logo}> BEATBOX</div>
            <div className={styles.signupForm}></div>
            <div className={styles.loginLink}></div>
        </div>
        <div className={styles.endContainer}></div>
    </div>
    </>
  )
}

export default Signup