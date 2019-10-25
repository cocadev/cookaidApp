import {ACTION_CATEGORY_FETCH_ERROR, ACTION_CATEGORY_FETCH_START, ACTION_CATEGORY_FETCH_SUCCESS} from "../actionTypes";


const initialState = {
  categories: null,
  isLoading: false,
  isSuccess: null,
  isError: null,
};

export default category = (state = initialState, action) => {

  switch (action.type) {

    case ACTION_CATEGORY_FETCH_START:
      return {
        ...state,
        isLoading: true,
        isSuccess: null,
        isError: null,
      };

    case ACTION_CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };

    case ACTION_CATEGORY_FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };

    default:
      return state;
  }
};
