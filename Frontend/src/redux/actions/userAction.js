import actionTypes from "../constats/actionTypes";
import axios from "axios";

// config for post request requires while login and signup
const config = {
  headers: { "Content-Type": "application/json" },
};

// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    const { data } = await axios.post(
      "/api/v1/signin",
      { email, password },
      config
    );
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      error: error.response ? error.response.data.message : "",
    });
  }
};

// signup
export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SIGNUP_REQUEST });
    const { data } = await axios.post(
      "/api/v1/register",
      {
        name,
        email,
        password,
      },
      config
    );
    dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      error: error.response ? error.response.data.message : "",
    });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/profile"); // it the details of user if signed in
    dispatch({ type: actionTypes.LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_USER_FAIL,
      error: error.response ? error.response.data.message : "",
    });
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/logout");
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_USER_FAIL,
      error: error.response ? error.response.data.message : "",
    });
  }
};

//Update user profile
export const updateProfile =
  (newName, newEmail, avatar) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });

      const { data } = await axios.put(
        "/api/v1/profile/update",
        { newName, newEmail, avatar },
        config
      );
      dispatch({
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// update password
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST });
      const { data } = await axios.put(
        `/api/v1/password/update`,
        { oldPassword, newPassword, confirmPassword },
        config
      );
      dispatch({ type: actionTypes.UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: actionTypes.UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// GET ALL USERS --ADMIN
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ALL_USERS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/getAllUsers");
    dispatch({ type: actionTypes.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: actionTypes.ALL_USERS_FAIL,
      error: error.response.data.message,
    });
  }
};

// GET SINGLE USER  --ADMIN
export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/getSingleUser/${id}`);
    dispatch({ type: actionTypes.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      error: error.response.data.message,
    });
  }
};

// CHANGE USER ROLE  --ADMIN
export const ChangeUserRole = (id, newData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_USER_ROLE_REQUEST });
    const { data } = await axios.put(
      `/api/v1/admin/updateUserRole/${id}`,
      newData,
      config
    );

    dispatch({
      type: actionTypes.UPDATE_USER_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_USER_ROLE_FAIL,
      error: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });
    const { data } = await axios.delete(`/api/v1//admin/deleteUser/${id}`);
    dispatch({ type: actionTypes.DELETE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};
