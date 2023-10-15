import React, { useState, useEffect } from "react";
import styles from "./ViewCart.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import TopContainer from "../../components/topcontainer/TopContainer";
import Logo from "../../assets/images/beatbox-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../../redux/actions/action";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const dlt = (_id) => {
    dispatch(DLT(_id));
  };

  const send = (e) => {
    dispatch(ADD(e));
  };

  const remove = (e) => {
    dispatch(REMOVE(e));
  };

  const { id } = useParams();
  // console.log(id);

  // const compare = ()=>{
  //   let comparedata = getdata.filter((e)=>{
  //     return e.id == id
  //   });
  //   setData(comparedata);
  // }

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
          navigate(-1);
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
            <h3>My Cart</h3>
            <div className={styles.productsDetails}>
              {getdata.map((product, index) => (
                <div key={index} className={styles.product}>
                  <img
                    src={product.images[1]}
                    className={styles.image1}
                    alt=""
                  />
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th className={styles.productName}>{product.name}</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>
                            <button onClick={() => dlt(product._id)}>
                              Delete
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
                          <td className={styles.totalCost}>{price}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.finalBill}></div>
          </div>
        </div>
        <div className={styles.endContainer}>
          <EndContainerComponent />
        </div>
      </div>
    </>
  );
};

export default ViewCart;
