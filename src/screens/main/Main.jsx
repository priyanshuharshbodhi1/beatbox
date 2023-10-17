import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import EndContainerComponent from "../../components/endContainer/EndContainer";
import PhoneSymbol from "../../assets/images/phone-symbol.png";
import Logo from "../../assets/images/beatbox-logo.png";
import FrontImage from "../../assets/images/front-image.png";
import ViewCartSymbol from "../../assets/images/view-cart.svg";
import AddToCartIcon from "../../assets/images/addtocart-icon.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../../redux/actions/action";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const companies = [
    "Company",
    "boAt",
    "Bose",
    "Sony",
    "Marshall",
    "Beats",
    "Skullcandy",
    "JBL",
  ];
  const colors = ["Color", "Black", "White", "Blue", "Red"];
  const productTypes = ["Headphone type", "over-ear", "in-ear", "on-ear"];
  const prices = ["Price", "₹0-₹5k", "₹5k-₹10k", "₹10k-₹20k", "₹20k-₹30k"];
  const sorts = [
    "Sort by:",
    // "Featured",
    "Low to High",
    "High to Low",
    "A to Z",
    "Z to A",
  ];

  const [selectedType, setSelectedType] = useState("Headphone type");
  const [selectedColor, setSelectedColor] = useState("Color");
  const [selectedCompany, setSelectedCompany] = useState("Company");
  const [selectedPrice, setSelectedPrice] = useState("Price");
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true); // Initially set to grid view

  // products.forEach((obj) => {
  //   const price = obj.price;
  //   console.log( typeof price);
  // });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
  };

  // Function to toggle between grid and list view
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/isloggedin`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          console.log("islogged in api",response.data)
        }
      })
      .catch((error) => {
        console.error("Error checking login status: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then((response) => {
        if (response.status === 200) {
          // console.log("products api",response.data)

          setProducts(response.data.slice(0, 15)); // Get the first 15 elements
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_BASE_URL}/products?`;
    if (selectedType !== "Headphone type") {
      url += `type=${selectedType}`;
    }
    if (selectedColor !== "Color") {
      if (url.endsWith("?")) {
        url += `color=${selectedColor}`;
      } else {
        url += `&color=${selectedColor}`;
      }
    }
    if (selectedCompany !== "Company") {
      if (url.endsWith("?")) {
        url += `company=${selectedCompany}`;
      } else {
        url += `&company=${selectedCompany}`;
      }
    }

    if (selectedPrice !== "Price") {
      const priceRange = selectedPrice.split("-").map((p) => {
        if (p[p.length - 1] === "k") {
          return parseInt(p.slice(1, -1)) * 1000;
        }
        return parseInt(p.slice(1));
      });

      if (url.endsWith("?")) {
        url += `price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`;
      } else {
        url += `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`;
      }
    }

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.slice(0, 15)); // Get the first 15 elements
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [selectedType, selectedColor, selectedCompany, selectedPrice]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_BASE_URL}/products/search?search=${searchText}&type=${selectedType}&color=${selectedColor}&company=${selectedCompany}&price_gte=${selectedPrice[0]}&price_lte=${selectedPrice[1]}`
  //       );
  //       if (response.status === 200) {
  //         setProducts(response.data.slice(0, 15)); // Get the first 15 elements
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, [searchText, selectedType, selectedColor, selectedCompany, selectedPrice]);

  const sortProducts = (sortBy) => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case "Low to High":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "High to Low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "A to Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("jwt");
          setIsLoggedIn(false);
          // console.log("User is logged out");
          navigate("/login");
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

            <Link
              to="/viewcart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className={styles.viewCartBtn}>
                <img
                  src={ViewCartSymbol}
                  alt=""
                  className={styles.ViewCartImage}
                  style={{ width: "15px", height: "auto", marginRight: "5px" }}
                />
                View Cart
              </button>
            </Link>
          </div>
          <div className={styles.mainImage}>
            <div style={{ padding: "1rem 2rem" }}>
              <div className={styles.headline}>
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
              placeholder="Search from BEATBOX"
              value={searchText}
              onChange={handleSearch}
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
            </div>
            <div className={styles.sortType}>
              <div className={styles.productType}>
                <select
                  className={styles.dropdown}
                  onChange={(e) => setSelectedType(e.target.value)}
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
                  onChange={(e) => setSelectedCompany(e.target.value)}
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
                  onChange={(e) => setSelectedColor(e.target.value)}
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
                  onChange={(e) => setSelectedPrice(e.target.value)}
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
                onChange={(e) => sortProducts(e.target.value)}
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
          <div
            className={`${styles.productDisplay} ${
              isGridView ? styles.gridDisplay : styles.listDisplay
            }`}
          >
            {isGridView
              ? products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={(event) => {
                      if (
                        !event.target.classList.contains(styles.addToCartIcon)
                      ) {
                        return;
                      }
                      if (!isLoggedIn) {
                        event.preventDefault();
                        navigate("/signup");
                      } else {
                        send(product);
                      }
                    }}
                  >
                    <div className={styles.productsGrid}>
                      <div
                        className={styles.productImage}
                        style={{
                          backgroundImage: `url(${product.images["1"]})`,
                        }}
                      >
                        <img
                          src={AddToCartIcon}
                          alt=""
                          className={styles.addToCartIcon}
                        />
                      </div>
                      <div
                        className={`${styles.productDetailsForGrid} ${styles.productDetails} `}
                      >
                        <div
                          className={`${styles.productName} ${styles.productNameForGrid}`}
                        >
                          {product.name}
                        </div>
                        <div className={styles.productPrice}>
                          Price - &#x20B9;
                          {product.price}
                          {/* {parseInt(product.price).toLocaleString("en-IN")} */}
                        </div>
                        <div className={styles.productColorAndType}>
                          {product.color} | {product.type}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={(event) => {
                      if (
                        event.target.classList.contains(styles.addToCartIcon)
                      ) {
                        event.preventDefault();
                        send(product);
                      }
                    }}
                  >
                    <div className={styles.productItem}>
                      <div
                        className={styles.productImage}
                        style={{
                          backgroundImage: `url(${product.images["1"]})`,
                        }}
                      >
                        <img
                          src={AddToCartIcon}
                          alt=""
                          className={styles.addToCartIcon}
                          onClick={(event) => event.preventDefault()}
                        />
                      </div>
                      <div className={styles.productDetails}>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productPrice}>
                          Price - &#x20B9;
                          {product.price}
                          {console.log(product.price)}{" "}
                          {/* {parseInt(product.price).toLocaleString("en-IN")} */}
                        </div>
                        <div className={styles.productColorAndType}>
                          {product.color} | {product.type}
                        </div>
                        <div className={styles.ProductTagline}>
                          {product.tagline}
                        </div>
                        <button className={styles.productDetailsBtn}>
                          Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
        <EndContainerComponent />
      </div>
    </>
  );
};

export default Main;
