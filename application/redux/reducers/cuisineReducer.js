import {ACTION_CUISINE_FETCH_ERROR, ACTION_CUISINE_FETCH_START, ACTION_CUISINE_FETCH_SUCCESS} from "../actionTypes";


const initialState = {
  cuisines: null,
  isLoading: false,
  isSuccess: null,
  isError: null,
};

export default cuisine = (state = initialState, action) => {

  switch (action.type) {

    case ACTION_CUISINE_FETCH_START:
      return {
        ...state,
        isLoading: true,
        isSuccess: null,
        isError: null,
      };

    case ACTION_CUISINE_FETCH_SUCCESS:
      return {
        ...state,
        cuisines: action.cuisines,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };

    case ACTION_CUISINE_FETCH_ERROR:
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
