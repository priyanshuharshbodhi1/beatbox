import React, { useState } from "react";
import styles from "./ViewCart.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import TopContainer from "../../components/topcontainer/TopContainer";
import Logo from "../../assets/images/beatbox-logo.png";

const ViewCart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, null, {
        withCredentials: true,
      })
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
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <TopContainer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
        <div className={styles.midContainer}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={Logo} alt="Beatbox Logo" className={styles.logoImage} />
              {"  "}
              BEATBOX
            </div>
            <div style={{ marginRight: "auto", marginLeft: "2rem" }}>
              Home/ View Cart
            </div>
          </div>
          <button className={styles.backToProductsBtn}>Back to Products</button>
          <div className={styles.cart}>
            <h3>My Cart</h3>
            <div className={styles.productsDetails}></div>
            <div className={styles.finalBill}></div>
          </div>
        </div>
        <div className={styles.endContainer}>
          <EndContainerComponent />
        </div>
      </div>
    </>
  );
};

export default ViewCart;
