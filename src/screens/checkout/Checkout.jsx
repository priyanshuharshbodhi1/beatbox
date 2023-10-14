import React, { useState } from "react";
import styles from "./Checkout.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import TopContainer from "../../components/topcontainer/TopContainer";
import Logo from "../../assets/images/beatbox-logo.png";

const Checkout = () => {
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
              Home/ Checkout
            </div>
          </div>
          <button className={styles.backToProductsBtn}>Back to Products</button>
          <h2>Checkout</h2>
          <div className={styles.checkoutDetails}>
            <div className={styles.details}>
              <div className={styles.deliveryAddress}>
                <div>1. Delivery Address</div>
                <div>
                  Akash Patel <br /> 104 <br /> kk hh nagar, Lucknow <br />{" "}
                  Uttar Pradesh, 226025
                </div>
              </div>
              <div className={styles.paymentMode}>
                <div>2. Mode of Payment</div>
                <div>Pay on delivery (Cash/Card)</div>
              </div>
              <div className={styles.reviewItems}>
                <div>3. Review items and delivery</div>
                <div>Item1 Item2</div>
              </div>
            </div>
            <div className={styles.orderCard}>
              <button className={styles.orderBtn}>Place your order</button>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
              <hr />
              <h3>Order Summary</h3>
              <div className={styles.itemsCost}>
                <div>Items:</div>
                <div>Rs</div>
              </div>
              <div className={styles.deliveryCost}>
                <div>Delivery:</div>
                <div>45</div>
              </div>
              <hr />
              <div className={styles.totalCost}>
                <div>Order Total:</div>
                <div>Rs</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.endContainer}>
          <EndContainerComponent />
        </div>
      </div>
    </>
  );
};

export default Checkout;
