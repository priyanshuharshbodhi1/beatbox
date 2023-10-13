import React from "react";
import styles from "./Main.module.css";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import PhoneSymbol from "../../assets/images/phone-symbol.png";
import Logo from "../../assets/images/beatbox-logo.png";
import FrontImage from "../../assets/images/front-image.png";
import ViewCartSymbol from "../../assets/images/view-cart.svg";

const Main = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <div
            className={styles.phoneNumber}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={PhoneSymbol}
              alt=""
              style={{ width: "20px", height: "auto", marginRight: "8px" }}
              className={styles.phone}
            />
            {"  "} <div> +91 212 113 1313</div>
          </div>
          <div>Get 50% off on selected items | Shop Now</div>
          <div>Login | SignUp</div>
        </div>
        <div className={styles.midContainer}>
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
          <div className={styles.mainImage}>
            <div style={{padding:"1rem 2rem"}}>
              <div style={{width:"25rem"}}>Grab upto 50% off on Selected headphones</div>
              <button className={styles.buyNowBtn}>Buy Now</button>
            </div>
            <img src={FrontImage} alt="" className={styles.FrontImage} />
          </div>
          <div className={styles.searchBar}>
            <input
              type="search"
              className={styles.searchBarInput}
              placeholder="Search Product"
            />
          </div>
          <div className={styles.sortingBar}>
            <div className={styles.viewType}>
                <div className={styles.gridView}></div>
                <div className={styles.listView}></div>
            </div>
            <div className={styles.sortType}>
                <div className={styles.productType}></div>
                <div className={styles.company}></div>
                <div className={styles.color}></div>
                <div className={styles.price}></div>

            </div>
            <div className={styles.featuredProductSort}></div>

          </div>
          <div className={styles.productDisplay}></div>
        </div>
        <EndContainerComponent />
      </div>
    </>
  );
};

export default Main;
