import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseFail = error => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error
  };
};

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_INGRED_FAILED,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
