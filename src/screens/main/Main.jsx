import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import PhoneSymbol from "../../assets/images/phone-symbol.png";
import Logo from "../../assets/images/beatbox-logo.png";
import FrontImage from "../../assets/images/front-image.png";
import ViewCartSymbol from "../../assets/images/view-cart.svg";
import { Link } from "react-router-dom";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState("");
  const companies = [
    "Company",
    "boAt",
    "Bose",
    "Sony",
    "Marshall",
    "Beats",
    "Scullcandy",
    "JBL",
  ];
  const colors = ["Color", "Black", "White", "Blue", "Red"];
  const productTypes = ["Headphone type", "Over-ear", "In-ear", "On-ear"];
  const prices = ["Price", "₹0-₹5k", "₹5k-₹10k", "₹1k-₹2k", "₹2k-₹3k"];
  const sorts = [
    "Sort by:",
    "Featured",
    "Lowest",
    "Highest",
    "A to Z)",
    "Z to A)",
  ];

  const [isGridView, setIsGridView] = useState(true); // Initially set to grid view

  // Function to toggle between grid and list view
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

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
              <div className={styles.viewIcon} onClick={toggleView}>
                {isGridView ? (
                  <FontAwesomeIcon icon={faGrip} size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faList} size="2x" />
                )}
              </div>
              {/* ... (Other components) */}
            </div>
            <div className={styles.sortType}>
              <div className={styles.productType}>
                <select
                  className={styles.dropdown}
                  onChange={(e) => console.log(e.target.value)}
                >
                  {productTypes.map((type, index) => (
                    <option key={index} value={type} className={styles.options}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.company}>
                <select
                  className={styles.dropdown}
                  onChange={(e) => console.log(e.target.value)}
                >
                  {companies.map((company, index) => (
                    <option
                      key={index}
                      value={company}
                      className={styles.options}
                    >
                      {company}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.color}>
                <select
                  className={styles.dropdown}
                  onChange={(e) => console.log(e.target.value)}
                >
                  {colors.map((color, index) => (
                    <option
                      key={index}
                      value={color}
                      className={styles.options}
                    >
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.price}>
                <select
                  className={styles.dropdown}
                  onChange={(e) => console.log(e.target.value)}
                >
                  {prices.map((price, index) => (
                    <option
                      key={index}
                      value={price}
                      className={styles.options}
                    >
                      {price}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.productSort}>
              <select
                className={styles.dropdown}
                onChange={(e) => console.log(e.target.value)}
                style={{ background: "#fefefe" }}
              >
                {sorts.map((sort, index) => (
                  <option key={index} value={sort} className={styles.options}>
                    {sort}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.productDisplay}></div>
        </div>
        <EndContainerComponent />
      </div>
    </>
  );
};

export default Main;
