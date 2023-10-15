import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/login/Login";
import SignUp from "./screens/signup/Signup";
import Main from "./screens/main/Main";
import ViewProduct from "./screens/viewproduct/ViewProduct";
import ViewCart from "./screens/viewcart/ViewCart";
import Checkout from "./screens/checkout/Checkout";
import OrderPlaced from "./screens/orderplaced/OrderPlaced";
import { Provider } from "react-redux";
import store from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/product/:productId",
    element: <ViewProduct />,
  },
  {
    path: "/viewcart",
    element: <ViewCart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/orderplaced",
    element: <OrderPlaced />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
