export const ADD = (item) => {
    return (dispatch, getState) => {
      dispatch({
        type: "ADD_CART",
        payload: item,
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().cartreducer.carts));
    }
  }
  
  export const DLT = (_id) => {
    return (dispatch, getState) => {
      dispatch({
        type: "RMV_CART",
        payload: _id,
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().cartreducer.carts));
    }
  }
  
  export const REMOVE = (item) => {
    return (dispatch, getState) => {
      dispatch({
        type: "RMV_ONE",
        payload: item,
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().cartreducer.carts));
    }
  }