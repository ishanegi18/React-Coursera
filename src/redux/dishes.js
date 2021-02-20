import * as ActionTypes from "./ActionTypes";

export const Dishes = (
  state = {
    isLoading: true,
    errorMessage: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DISHES_LOADING:
      // spread operator, whatever in state is there, that and add more after comma, so state is not mutate
      return { ...state, isLoading: true, errorMessage: null, dishes: [] };

    // action.payload should get the error message
    // loading is failed thus equal to false
    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errorMessage: action.payload };

    //loading done so = to false
    // no error message
    // payload should contain dishes array so = to dishes
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        dishes: action.payload,
      };

    default:
      return state;
  }
};
