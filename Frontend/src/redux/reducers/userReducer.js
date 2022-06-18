import actionTypes from "../constats/actionTypes";

const initState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
    case actionTypes.LOAD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };

    case actionTypes.LOGIN_FAIL:
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: action.error,
      };

    case actionTypes.LOAD_USER_FAIL:
      return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case actionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE_REQUEST:
    case actionTypes.UPDATE_PASSWORD_REQUEST:
    case actionTypes.UPDATE_USER_ROLE_REQUEST:
    case actionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.UPDATE_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
    case actionTypes.UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload,
      };

    case actionTypes.UPDATE_PROFILE_FAIL:
    case actionTypes.UPDATE_PASSWORD_FAIL:
    case actionTypes.UPDATE_USER_ROLE_FAIL:
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case actionTypes.UPDATE_PROFILE_RESET:
    case actionTypes.UPDATE_PASSWORD_RESET:
    case actionTypes.UPDATE_USER_ROLE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleted: action.payload,
      };
    case actionTypes.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};

export const allUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUsers: action.payload,
      };
    case actionTypes.ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case actionTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
