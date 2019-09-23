import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingred => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingred
  };
};

export const fetchIngredFailed = () => {
  return {
    type: actionTypes.FETCH_INGRED_FAILED
  };
};

export const initIngredients = () => {
  // we can return like this because of redux-thunk
  return dispatch => {
    axios
      .get("https://react-my-burger-365e4.firebaseio.com/ingredients.json")
      .then(resp => {
        dispatch(setIngredients(resp.data));
      })
      .catch(er => {
        dispatch(fetchIngredFailed());
      });
  };
};
