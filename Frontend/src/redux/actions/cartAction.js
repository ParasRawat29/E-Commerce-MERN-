import axios from "axios";
import actionTypes from "../constats/actionTypes";

// add item to cart and store in local storage
export const addItemToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: productId,
        image: data.product.images[0].image_url,
        price: data.product.price,
        stock: data.product.stock,
        name: data.product.name,
        quantity,
      },
    });

    // adding cart to local storage
    localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
  };

// remove item from cart and update in local storage
export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });

  // updating the changes in local storeage
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

// increase quantiy of product present in cart
export const increaseQuantityInCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.INCREASE_QUANTITY_IN_CART,
    payload: id,
  });

  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};
// decrease quantiy of product present in cart
export const decreaseQuantityInCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.DECREASE_QUANTITY_IN_CART,
    payload: id,
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

//Save shiping info
export const saveShipingInfo = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_SHIPING_INFO,
    payload: data,
  });
  //store in local storage
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
