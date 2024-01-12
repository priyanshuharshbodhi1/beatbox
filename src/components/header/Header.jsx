import React from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/images/beatbox-logo.png";
import ViewCartSymbol from "../../assets/images/view-cart.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItemCount = useSelector((state) =>
    state.cartreducer.carts.reduce((total, item) => total + item.qnty, 0)
  );

  // console.log("cartItems", cartItemCount);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="Beatbox Logo" className={styles.logoImage} />
        {"  "}
        BEATBOX
      </div>
      <div style={{ marginRight: "auto", marginLeft: "2rem" }}>Home</div>
      <Link to="/viewcart" style={{ textDecoration: "none", color: "inherit" }}>
        <button className={styles.viewCartBtn} style={{ position: "relative" }}>
          <img
            src={ViewCartSymbol}
            alt=""
            className={styles.ViewCartImage}
            style={{
              width: "15px",
              height: "auto",
              marginRight: "5px",
            }}
          />
          View Cart
          <div
            style={{
              background: "red",
              height:"10px",
              width: "10px",
              borderRadius: "50%",
              fontSize: ".8rem",
              position: "absolute",
              padding: "2.5px",
              fontWeight: "bold",
              top: "-8px",
              right: "-6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartItemCount}
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Header;
