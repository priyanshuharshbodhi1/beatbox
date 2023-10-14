import React from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/images/beatbox-logo.png";
import ViewCartSymbol from "../../assets/images/view-cart.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="Beatbox Logo" className={styles.logoImage} />
        {"  "}
        BEATBOX
      </div>
      <div style={{ marginRight: "auto", marginLeft: "2rem" }}>Home</div>
      <button className={styles.viewCartBtn}>
        <img
          src={ViewCartSymbol}
          alt=""
          className={styles.ViewCartImage}
          style={{ width: "15px", height: "auto", marginRight: "5px" }}
        />
        View Cart
      </button>
    </div>
  );
};

export default Header;
