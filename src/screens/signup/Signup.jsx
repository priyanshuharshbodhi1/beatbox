import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import LogoComponent from "../../components/logo/Logo";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import { Link } from "react-router-dom";

const Signup = () => {
  // const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    // Fetch the API endpoint and get the response
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/signup`,
      {
        method: "POST",
        // Add your form data here
        headers: { name, email, mobile, password },
      }
    );
    console.log("response", response);
    // Check if the response is successful
    if (response.status === 200) {
      // Get the token from the response
      const data = await response.json();
      const token = data.token;

      // Save the token in localStorage
      localStorage.setItem("token", token);

      navigate("/");
    } else {
      const data = await response.json();
      const message = data.message;
      setErrorMessage(message);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <LogoComponent />
          <div className={styles.signupForm}>
            <form onSubmit={handleSubmit}>
              <h2 className={styles.title}>Create Account</h2>{" "}
              <div>
                <label className={styles.label} htmlFor="name">
                  Your Name
                </label>
                <br />
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="mobile">
                  Mobile number
                </label>
                <br />
                <input
                  className={styles.input}
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="email">
                  Email Id
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "inherit" }}
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
