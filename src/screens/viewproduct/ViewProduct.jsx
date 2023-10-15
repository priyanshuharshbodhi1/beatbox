import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImageSlider from "react-simple-image-slider";
import styles from "./ViewProduct.module.css";
import TopContainer from "../../components/topcontainer/TopContainer";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import HeaderComponent from "../../components/header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD } from "../../redux/actions/action";

const ViewProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState({});

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const send = (e) => {
    if (!isLoggedIn) {
      navigate("/signup");
    } else {
      dispatch(ADD(e));
    }
  };

  const send2 = (e) => {
    if (!isLoggedIn) {
      navigate("/signup");
    } else {
      dispatch(ADD(e));
      navigate("/viewcart");
    }
  };

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isloggedin`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("Error checking login status: ", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the product details using the productId
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("jwt");
          setIsLoggedIn(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const handleBackBtn = () => {
    navigate(-1);
  };

  const imageStyle = {
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "4px solid rgba(0, 102, 255, 0.17)",
    borderRadius: "1rem",
    position: "relative",
  };

  return (
    <>
      <div className={styles.topContainer}>
        <TopContainer isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
      <div className={styles.midContainer}>
        <HeaderComponent />
        <button onClick={handleBackBtn} className={styles.backToProductsBtn}>
          Back to Products
        </button>
        <div className={styles.productTagline}>{product.tagline}</div>
        <div style={{ display: "flex", padding: "1rem", gap: "1rem" }}>
          <div className={styles.productImages}>
            {product && product.images && (
              <ImageSlider
                width={400}
                height={400}
                showBullets={true}
                showNavs={true}
                navStyle={2}
                bgColor={"#000"}
                images={[
                  { url: product.images["1"], style: imageStyle },
                  { url: product.images["2"], style: imageStyle },
                  { url: product.images["3"], style: imageStyle },
                  { url: product.images["4"], style: imageStyle },
                ]}
              />
            )}
          </div>
          <div className={styles.productDetails}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productRating}></div>
            <div className={styles.productPrice}>&#x20B9;{product.price} </div>
            <div className={styles.productColorAndType}>
              {product.color} | {product.type} Device
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

            <Link>
              <button
                className={styles.addToCartBtn}
                onClick={() => send(product)}
              >
                Add to Cart
              </button>
            </Link>
            {/* make the add btn alert later above */}
            <Link>
              <button
                className={styles.buyNowBtn}
                onClick={() => send2(product)}
              >
                Buy Now
              </button>
            </Link>
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
