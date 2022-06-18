import axios from "axios";
import actionTypes from "../constats/actionTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: actionTypes.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.MY_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/myOrders");
    dispatch({ type: actionTypes.MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: actionTypes.MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get order details --Admin
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${orderId}`);
    dispatch({ type: actionTypes.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.ORDER_DETAILS_FAIL,
      payload: error.response.data.messae,
    });
  }
};

// get all orders -- admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ALL_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch({ type: actionTypes.ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_ORDERS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST });
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      { status },
      config
    );

    dispatch({ type: actionTypes.UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ORDER_FAIL,
      error: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};
