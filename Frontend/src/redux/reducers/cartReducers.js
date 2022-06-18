import actionTypes from "../constats/actionTypes";

const initState = {
  cartItems: [],
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        cartItems: [...state.cartItems, action.payload],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case actionTypes.INCREASE_QUANTITY_IN_CART:
      const updatedCart = state.cartItems.map((item) => {
        if (item.product === action.payload) {
          if (item.quantity < item.stock) {
            item.quantity += 1;
          }
        }
        return item;
      });

      return {
        ...state,
        cartItems: [...updatedCart],
      };

    case actionTypes.DECREASE_QUANTITY_IN_CART: {
      const updatedCart = state.cartItems.map((item) => {
        if (item.product === action.payload) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          }
        }
        return item;
      });
      return {
        ...state,
        cartItems: [...updatedCart],
      };
    }

    case actionTypes.SAVE_SHIPING_INFO:
      return { ...state, shippingInfo: action.payload };

    default:
      return state;
  }
};
