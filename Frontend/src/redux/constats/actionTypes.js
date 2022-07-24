const actionTypes = {
  // all products constant
  ALL_PRODUCTS_REQUEST: "ALL_PRODUCTS_REQUEST",
  ALL_PRODUCTS_SUCCESS: "ALL_PRODUCTS_SUCCESS",
  ALL_PRODUCTS_FAIL: "ALL_PRODUCTS_FAIL",

  // product detail constant
  PRODUCT_DETAILS_REQUEST: "PRODUCT_DETAILS_REQUEST",
  PRODUCT_DETAILS_SUCCESS: "PRODUCT_DETAILS_SUCCESS",
  PRODUCT_DETAILS_FAIL: "PRODUCT_DETAILS_FAIL",

  // Login constant
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  // Signup constant
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAIL: "SIGNUP_FAIL",

  // Logout constant
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",

  // Load user constant
  LOAD_USER_REQUEST: "LOAD_USER_REQUEST",
  LOAD_USER_SUCCESS: "LOAD_USER_SUCCESS",
  LOAD_USER_FAIL: "LOAD_USER_FAIL",

  // Update profile constant
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL",
  UPDATE_PROFILE_RESET: "UPDATE_PROFILE_RESET",

  // Update Password constant
  UPDATE_PASSWORD_REQUEST: "UPDATE_PASSWORD_REQUEST",
  UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS",
  UPDATE_PASSWORD_FAIL: "UPDATE_PASSWORD_FAIL",
  UPDATE_PASSWORD_RESET: "UPDATE_PASSWORD_RESET",

  // Cart constant
  ADD_TO_CART: " ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  INCREASE_QUANTITY_IN_CART: "INCREASE_QUANTITY_IN_CART",
  DECREASE_QUANTITY_IN_CART: "DECREASE_QUANTITY_IN_CART",

  // Shiping constant
  SAVE_SHIPING_INFO: "SAVE_SHIPING_INFO",

  // Orders constant
  CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_FAIL: "CREATE_ORDER_FAIL",

  // My Orders constant
  MY_ORDERS_REQUEST: "MY_ORDERS_REQUEST",
  MY_ORDERS_SUCCESS: "MY_ORDERS_SUCCESS",
  MY_ORDERS_FAIL: "MY_ORDERS_FAIL",

  // My Orders constant
  ORDER_DETAILS_REQUEST: "ORDER_DETAILS_REQUEST",
  ORDER_DETAILS_SUCCESS: "ORDER_DETAILS_SUCCESS",
  ORDER_DETAILS_FAIL: "ORDER_DETAILS_FAIL",

  // Review constant
  PRODUCT_REVIEWS_REQUEST: "PRODUCT_REVIEWS_REQUEST",
  PRODUCT_REVIEWS_SUCCESS: "PRODUCT_REVIEWS_SUCCESS",
  PRODUCT_REVIEWS_FAIL: "PRODUCT_REVIEWS_FAIL",

  // New Review constant
  NEW_REVIEW_REQUEST: "NEW_REVIEW_REQUEST",
  NEW_REVIEW_SUCCESS: "NEW_REVIEW_SUCCESS",
  NEW_REVIEW_FAIL: "NEW_REVIEW_FAIL",
  NEW_REVIEW_RESET: "NEW_REVIEW_RESET",
  // New Review constant
  DELETE_REVIEW_REQUEST: "DELETE_REVIEW_REQUEST",
  DELETE_REVIEW_SUCCESS: "DELETE_REVIEW_SUCCESS",
  DELETE_REVIEW_FAIL: "DELETE_REVIEW_FAIL",
  DELETE_REVIEW_RESET: "DELETE_REVIEW_RESET",

  // All Users constant --ADMIN
  ALL_USERS_REQUEST: "ALL_USERS_REQUEST",
  ALL_USERS_SUCCESS: "ALL_USERS_SUCCESS",
  ALL_USERS_FAIL: "ALL_USERS_FAIL",

  // User Detail constant --ADMIN
  USER_DETAILS_REQUEST: "USER_DETAILS_REQUEST",
  USER_DETAILS_SUCCESS: "USER_DETAILS_SUCCESS",
  USER_DETAILS_FAIL: "USER_DETAILS_FAIL",

  // All Orders constant --ADMIN
  ALL_ORDERS_REQUEST: "ALL_ORDERS_REQUEST",
  ALL_ORDERS_SUCCESS: "ALL_ORDERS_SUCCESS",
  ALL_ORDERS_FAIL: "ALL_ORDERS_FAIL",

  // Update User Role Constant --ADMIN
  UPDATE_USER_ROLE_REQUEST: "UPDATE_USER_ROLE_REQUEST",
  UPDATE_USER_ROLE_SUCCESS: "UPDATE_USER_ROLE_SUCCESS",
  UPDATE_USER_ROLE_FAIL: "UPDATE_USER_ROLE_FAIL",
  UPDATE_USER_ROLE_RESET: "UPDATE_USER_ROLE_RESET",

  // All Users constant --ADMIN
  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAIL: "DELETE_USER_FAIL",
  DELETE_USER_RESET: "DELETE_USER_RESET",

  //Order constant --ADMIN
  UPDATE_ORDER_REQUEST: "UPDATE_ORDER_REQUEST",
  UPDATE_ORDER_SUCCESS: "UPDATE_ORDER_SUCCESS",
  UPDATE_ORDER_FAIL: "UPDATE_ORDER_FAIL",
  UPDATE_ORDER_RESET: "UPDATE_ORDER_RESET",

  //New Product constant --ADMIN
  NEW_PRODUCT_REQUEST: "NEW_PRODUCT_REQUEST",
  NEW_PRODUCT_SUCCESS: "NEW_PRODUCT_SUCCESS",
  NEW_PRODUCT_FAIL: "NEW_PRODUCT_FAIL",
  NEW_PRODUCT_RESET: "NEW_PRODUCT_RESET",

  //All Product constant --ADMIN
  ALL_ADMIN_PRODUCT_REQUEST: "ALL_ADMIN_PRODUCT_REQUEST",
  ALL_ADMIN_PRODUCT_SUCCESS: "ALL_ADMIN_PRODUCT_SUCCESS",
  ALL_ADMIN_PRODUCT_FAIL: "ALL_ADMIN_PRODUCT_FAIL",

  // delete product --ADMIN
  DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAIL: "DELETE_PRODUCT_FAIL",
  DELETE_PRODUCT_RESET: "DELETE_PRODUCT_RESET",

  // Update product --Admin
  UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
  UPDATE_PRODUCT_FAIL: "UPDATE_PRODUCT_FAIL",
  UPDATE_PRODUCT_RESET: "UPDATE_PRODUCT_RESET",

  // CATEGORY , PRICE , PAGEINATION --Admin
  CHANGE_PRICE: "CHANGE_PRICE",
  CHANGE_CURR_PAGE: "CHANGE_CURR_PAGE",
  CHANGE_ACTIVE_CATEGORY: "CHANGE_ACTIVE_CATEGORY",
  CHANGE_RATINGS: "CHANGE_RATINGS",

  // clear errors
  CLEAR_ERRORS: "CLEAR_ERRORS",
};

export default actionTypes;
