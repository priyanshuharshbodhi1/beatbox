import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./ViewProduct.module.css";
import TopContainer from "../../components/topcontainer/TopContainer";

const ViewProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, null, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("jwt");
          setIsLoggedIn(false);
          console.log("User is logged out");
          // history.push("/login"); // Navigate to /login
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  return (
    <>
    <div className={styles.topContainer}></div>
      <TopContainer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </>
  );
};

export default ViewProduct;
