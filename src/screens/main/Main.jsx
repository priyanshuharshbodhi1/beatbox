import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./Main.module.css";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import PhoneSymbol from "../../assets/images/phone-symbol.png";
import Logo from "../../assets/images/beatbox-logo.png";
import FrontImage from "../../assets/images/front-image.png";
import ViewCartSymbol from "../../assets/images/view-cart.svg";
import { Link } from "react-router-dom";

const Main = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/isloggedin")
      .then((response) => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          // setUserName(response.data.name);
          console.log(response.data.isLoggedIn);
        }
      })
      .catch((error) => {
        console.error("Error checking login status: ", error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:3500/api/logout", null, { withCredentials: true })
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
            <div style={{ padding: "1rem 2rem" }}>
              <div style={{ width: "25rem" }}>
                Grab upto 50% off on Selected headphones
              </div>
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
