import axios from "axios";
import actionTypes from "../constats/actionTypes";

export const getProducts =
  (
    keyword = "",
    currPage = 1,
    activeCategory,
    price = [0, 10000],
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: actionTypes.ALL_PRODUCTS_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (activeCategory !== "all") {
        link = `/api/v1/products?keyword=${keyword}&page=${currPage}&category=${activeCategory}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: actionTypes.ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.ALL_PRODUCTS_FAIL,
        error: error.response.statusText,
      });
    }
  };

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ALL_ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products");
    console.log(data);
    dispatch({ type: actionTypes.ALL_ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_ADMIN_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_FAIL,
      error: error.response.data.message,
    });
  }
};

const config = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const createReview = (review, productId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.NEW_REVIEW_REQUEST });
    const { data } = await axios.put(
      "/api/v1/review/new",
      { ...review, productId },
      config
    );
    dispatch({ type: actionTypes.NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.NEW_REVIEW_FAIL,
      error: error.response.data.message,
    });
  }
};

// Create product --ADMIN
export const createProduct = (prodData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.NEW_PRODUCT_REQUEST });
    const { data } = await axios.post("/api/v1/add-product", prodData, config);
    dispatch({ type: actionTypes.NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.NEW_PRODUCT_FAIL,
      payload: actionTypes?.error?.response?.data?.message,
    });
  }
};

// Delete product --ADMIN
export const deleteProduct = (prodId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/v1/delete-product/${prodId}`);
    dispatch({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};

// update product --ADMIN
export const updateProduct = (prodId, prodData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST });
    const { data } = await axios.put(
      `/api/v1/update-product/${prodId}`,
      prodData,
      config
    );
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};
