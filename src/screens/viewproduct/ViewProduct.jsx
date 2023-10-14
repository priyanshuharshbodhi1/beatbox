import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./ViewProduct.module.css";
import TopContainer from "../../components/topcontainer/TopContainer";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import HeaderComponent from "../../components/header/Header";

const ViewProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState({});

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data[0]); // Assuming the first product as an example
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.topContainer}>
        <TopContainer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
      <div className={styles.midContainer}>
        <HeaderComponent />
        <button className={styles.backToProductsBtn}>Back to Products</button>
        <div className={styles.productTagline}>{product.tagline}</div>
        <div>
          <div className={styles.productImages}>
            {/* Render product images here */}
            <div
              className={styles.productImage}
              style={{ backgroundImage: `url(${product.images["1"]})` }}
            ></div>
          </div>
          <div className={styles.productDetails}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productRating}></div>
            <div className={styles.productPrice}>{product.price}</div>
            <div className={styles.productColorAndType}>
              {product.color} | {product.type}
            </div>
            <div className={styles.productAbout}>
              About this item: <br />
              {product.about}
            </div>
            <div className={styles.productStock}>In Stock</div>
            {/* {product.stock} - consider this when having time */}
            <div className={styles.productCompany}>
              Brand - {product.company}
            </div>
            <button className={styles.addToCartBtn}>Add to Cart</button>
            <button className={styles.buyNowBtn}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className={styles.endContainer}>
        <EndContainerComponent />
      </div>
    </>
  );
};

export default ViewProduct;
