import React from "react";
import styles from "./Signup.module.css";
import LogoComponent from "../../components/logo/Logo";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <LogoComponent />
          <div className={styles.signupForm}>
            <h2 className={styles.title}>Create Account</h2>{" "}
            <div>
              <label className={styles.label} for="name">
                Your Name
              </label>
              <br />
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div>
              <label className={styles.label} for="mobile">
                Mobile number
              </label>
              <br />
              <input
                className={styles.input}
                type="text"
                id="mobile"
                name="mobile"
              />
            </div>
            <div>
              <label className={styles.label} for="email">
                Email Id
              </label>
              <br />
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div>
              <label className={styles.label} for="password">
                Password
              </label>
              <br />
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
              />
            </div>
            <button className={styles.continueBtn} type="submit">
              Continue
            </button>
            <p className={styles.terms}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>

          <div className={styles.loginLink}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "inherit"}}
            >
              Log In
            </Link>
          </div>
        </div>
        <EndContainerComponent />
      </div>
    </>
  );
};

export default Signup;
