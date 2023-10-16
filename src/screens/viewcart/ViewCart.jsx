import React, { useState, useEffect } from "react";
import styles from "./ViewCart.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EndContainerComponent from "../../components/endContainer/EndContainer";
import TopContainer from "../../components/topcontainer/TopContainer";
import Logo from "../../assets/images/beatbox-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../../redux/actions/action";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (_id) => {
    dispatch(DLT(_id));
  };

  const remove = (e) => {
    dispatch(REMOVE(e));
  };

  // const { id } = useParams();
  // console.log(id);

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      return (price = ele.price * ele.qnty + price);
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          </div>{" "}
          <Link to="/">
            {" "}
            <button className={styles.backToProductsBtn}>
              Back to Products
            </button>
          </Link>
          <div className={styles.cart}>
            <h2 style={{ textAlign: "center" }}>My Cart</h2>
            <div className={styles.productsDetails}>
              {getdata.length === 0 ? (
                <div
                  className={styles.emptyCart}
                  style={{ textAlign: "center", padding: "3rem .4rem" }}
                >
                  Your Cart is Empty
                </div>
              ) : (
                getdata.map((product, index) => (
                  <div key={index} className={styles.product}>
                    <img
                      src={product.images[1]}
                      className={styles.image1}
                      alt=""
                    />
                    <div className={styles.tableContainer}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th className={styles.productName}>
                              {product.name}
                            </th>
                            <th className={styles.tableHeader}>Price</th>
                            <th className={styles.tableHeader}>Quantity</th>
                            <th className={styles.tableHeader}>Total</th>
                            <th className={styles.tableHeader}>
                              <button
                                onClick={() => dlt(product._id)}
                                className={styles.deleteItemBtn}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className={styles.productColor}>
                              Color: {product.color}
                            </td>
                            <td className={styles.productPrice}>
                              {product.price}
                            </td>
                            <td
                              className={styles.productQuantity}
                              style={{
                                background: "#dadada",
                                display: "flex",
                                justifyContent: "space-evenly",
                                padding: ".3rem .2rem",
                              }}
                            >
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => remove(product)}
                              >
                                -
                              </span>{" "}
                              {product.qnty}{" "}
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => send(product)}
                              >
                                +
                              </span>
                            </td>
                            <td className={styles.totalCostOfProduct}>
                              {product.price * product.qnty}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={styles.finalBill}></div>
          </div>
          {getdata.length > 0 && (
            <div className={styles.checkoutWindow}>
              <h3
                style={{
                  textAlign: "center",
                  textDecoration: "underline",
                  padding: "2rem 0",
                }}
              >
                Checkout
              </h3>
              <div className={styles.checkoutDetails}>
                <div className={styles.details}>
                  <div className={styles.deliveryAddress}>
                    <div className={styles.detail}>1. Delivery Address</div>
                    <textarea name="" id="" cols="30" rows="10" color="#797979">
                      Haus Khas, New Delhi, 110016
                    </textarea>
                  </div>
                  <br />
                  <div className={styles.paymentMode}>
                    <div className={styles.detail}>2. Mode of Payment</div>
                    <select>
                      <option value="cash">Cash on Delivery</option>
                      <option value="card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>
                  <br />
                  <div className={styles.reviewItems}>
                    <div className={styles.detail}>3. Delivery Cost</div>
                    <div style={{ fontSize: ".9rem" }}>Rs 45</div>
                  </div>
                  <br />
                </div>
                <div className={styles.orderCard}>
                  <Link to="/orderplaced">
                    <button className={styles.orderBtn}>
                      Place your order
                    </button>
                  </Link>

                  <p style={{ fontSize: ".8rem", textAlign: "center" }}>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </p>
                  <hr />
                  <h3>Order Summary</h3>
                  <div>
                    {" "}
                    <div className={styles.itemsCost}>
                      <div>Items Cost:</div>
                      <div>Rs {price}</div>
                    </div>
                    <div className={styles.deliveryCost}>
                      <div>Delivery:</div>
                      <div>Rs 45</div>
                    </div>
                  </div>

                  <hr />
                  <div className={styles.totalCost}>
                    <div className={styles.detail}>Order Total:</div>
                    <div className={styles.detail}>Rs {price + 45}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.endContainer}>
          <EndContainerComponent />
        </div>
      </div>
    </>
  );
};

export default ViewCart;
