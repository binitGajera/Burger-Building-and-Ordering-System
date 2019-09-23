import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuth = expireTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI75BltFIEpnBn-T7eRCL3qbBsfpWaLoM";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI75BltFIEpnBn-T7eRCL3qbBsfpWaLoM";
    }
    axios
      .post(url, authData)
      .then(resp => {
        const expireDate = new Date(
          new Date().getTime() + resp.data.expiresIn * 1000
        );
        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("userId", resp.data.localId);
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuth(resp.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expireDate = new Date(localStorage.getItem("expireDate"));
      if (expireDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuth((expireDate.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
