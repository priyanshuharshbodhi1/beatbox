import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import LogoComponent from "../../components/logo/Logo";
import EndContainerComponent from "../../components/endContainer/EndContainer";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      // Submit the form and get the response with the JWT token
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: { email, password },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        // Save the JWT token in localStorage
        localStorage.setItem("token", data.token);
        // Navigate to the home page
        navigate("/");
      } else {
        
        const message = data.message;
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error here
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <LogoComponent />
          <div className={styles.signinForm}>
            <form onSubmit={handleSubmit}>
              <h2 className={styles.title}>Log in</h2>{" "}
              <div>
                <label className={styles.label} htmlFor="email">
                  Enter your Email Id
                </label>
                <br />
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <br />
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div>
                {errorMessage && (
                  <p className={styles.errorMessage}>{errorMessage}</p>
                )}
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
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Create your BEATBOX Account
              </Link>
            </button>
          </div>
        </div>
        <EndContainerComponent />
      </div>
    </>
  );
};

export default Login;
