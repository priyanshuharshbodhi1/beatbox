import React from "react";
import styles from "./Login.module.css";
import LogoComponent from "../../components/logo/Logo";
import EndContainerComponent from "../../components/endContainer/EndContainer";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <LogoComponent/>
          <div className={styles.signinForm}>
            <form action="/your-action" method="POST">
              <h2 className={styles.title}>Sign in</h2>{" "}
              <div>
                <label className={styles.label} for="email">
                  Enter your Email Id
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
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </form>
          </div>
          <div className={styles.loginLink}>
            <div>
              <hr
                style={{
                  border: "none",
                  borderTop: "1.5px solid #d9d9d9",
                  margin: "25px 0",
                }}
              />
            </div>{" "}
            <button className={styles.signupBtn}>
              <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Create your BEATBOX Account</Link>
            </button>
          </div>
        </div>
        <EndContainerComponent/>
      </div>
    </>
  );
};

export default Login;
