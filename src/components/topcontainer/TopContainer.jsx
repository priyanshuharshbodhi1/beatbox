// TopContainerComponent.js
import React from "react";
import styles from "./TopContainer.module.css";
import PhoneSymbol from "../../assets/images/phone-symbol.png";
import { Link } from "react-router-dom";

const TopContainer = ({ isLoggedIn, handleLogout }) => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.phoneNumber}>
        <img
          src={PhoneSymbol}
          alt=""
          className={styles.phone}
        />
        {"  "} <div> +91 212 113 1313</div>
      </div>
      <div>Get 50% off on selected items | Shop Now</div>
      <div>
        {isLoggedIn ? (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Log In
            </Link>{" "}
            |{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TopContainer;
