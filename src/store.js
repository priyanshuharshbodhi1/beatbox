import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootred from "./redux/reducers/main";

const savedCartItems = localStorage.getItem('cartItems');
const initialState = {
  cartreducer: {
    carts: savedCartItems ? JSON.parse(savedCartItems) : [],
  },
};

const store = createStore(
  rootred,
  initialState,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  const { carts } = store.getState().cartreducer;
  localStorage.setItem('cartItems', JSON.stringify(carts));
});

export default store;