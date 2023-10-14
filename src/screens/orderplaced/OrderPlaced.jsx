import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderPlaced.module.css";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import LogoComponent from "../../components/logo/Logo";
import Confetti from "../../assets/images/confetti.png";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <LogoComponent />
        </div>
        <div className={styles.successCard}>
          <div className={styles.successImage}>
            <img src={Confetti} alt="" className={styles.confetti} />
          </div>
          <p className={styles.tagline}>Order is placed successfully!</p>
          <p style={{ color: "#969696" }}>
            You will be receiving a confirmation email with order details
          </p>
          <button onClick={handleNavigation} className={styles.homePageBtn}>
            Go back to Home page
          </button>
        </div>
        <div className={styles.endContainer}>
          <EndContainerComponent />
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
