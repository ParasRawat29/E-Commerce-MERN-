import actionTypes from "../constats/actionTypes";
const initState = {
  products: [],
  isLoading: false,
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ALL_PRODUCTS_REQUEST:
      return { isLoading: true, products: [] };

    case actionTypes.ALL_PRODUCTS_SUCCESS:
      return {
        isLoading: false,
        products: action.payload.products,
        productsCount: action.payload.totalProductsCount,
        itemsPerPage: action.payload.ITEM_PER_PAGE,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case actionTypes.ALL_PRODUCTS_FAIL:
      console.log(action);
      return { isLoading: false, error: action.error };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return { isLoading: true, products: [] };

    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        isLoading: false,
        product: action.payload.product,
      };
    case actionTypes.ALL_PRODUCTS_FAIL:
      return { isLoading: false, error: action.error };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEW_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };
    case actionTypes.NEW_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.NEW_REVIEW_RESET:
      return {
        ...state,
        isLoading: false,
        success: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEW_PRODUCT_REQUEST:
    case actionTypes.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.NEW_PRODUCT_SUCCESS:
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case actionTypes.NEW_PRODUCT_FAIL:
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_PRODUCT_RESET:
    case actionTypes.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allAdminProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ALL_ADMIN_PRODUCT_REQUEST:
    case actionTypes.DELETE_PRODUCT_REQUEST:
      return { isLoading: true, products: [] };

    case actionTypes.ALL_ADMIN_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        products: action.payload.products,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isDeleted: action.payload,
      };
    case actionTypes.DELETE_PRODUCT_FAIL:
    case actionTypes.ALL_ADMIN_PRODUCT_FAIL:
      return {
        isLoading: false,
        error: action.error,
      };
    case actionTypes.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
