import actionTypes from "../constats/actionTypes";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const myOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.MY_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.MY_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case actionTypes.MY_ORDERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
    case actionTypes.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_ORDERS_FAIL:
    case actionTypes.ORDER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case actionTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload.order,
      };
    case actionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        isUpdated: action.payload.success,
      };
    case actionTypes.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ALL_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ALL_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };
    case actionTypes.ALL_ORDERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
