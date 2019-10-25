import {
  ACTION_CLEAR_KEYWORD,
  ACTION_CLEAR_RANDOM_RESULT, ACTION_CLEAR_RECIPES_BY_CATEGORY,
  ACTION_CLEAR_RESULT_RECIPES_BY_CUISINE,
  ACTION_CLEAR_SEARCH_RESULT, ACTION_FINISH_FETCHING_RANDOM, ACTION_FINISH_RECIPES_BY_CATEGORY,
  ACTION_FINISH_SEARCH,
  ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE, ACTION_PUSH_RECIPES_BY_CATEGORY, ACTION_PUSH_RESULT_RANDOM_LIST,
  ACTION_PUSH_RESULT_RECIPES_BY_CUISINE,
  ACTION_PUSH_RESULT_RECIPES_LIST,
  ACTION_PUT_RESULT_RANDOM_LIST,
  ACTION_PUT_RESULT_RECIPES_LIST, ACTION_START_FETCHING_RANDOM, ACTION_START_GET_RECIPES_BY_CATEGORY,
  ACTION_START_SEARCH,
  ACTION_START_SEARCH_RECIPES_BY_CUISINE,
  ACTION_UPDATE_OFFSET, ACTION_UPDATE_RANDOM_OFFSET,
  ACTION_UPDATE_RECIPE,
} from "../actionTypes";
import {findDuplicateInArray, getUniqueArray} from "../../utils/utils";


const initialState = {
  isLoading: false,
  isSuccess: null,
  isError: null,
  numberPerPage: 20,
  homeRecipeList: null,
};

export default homeRecipes = (state = initialState, action) => {

  switch (action.type) {

    case ACTION_START_FETCHING_RANDOM:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      }

    case ACTION_FINISH_FETCHING_RANDOM:
      return {
        ...state,
        isLoading: false,
        isSuccess: action.success,
        isError: !action.success,
      }

    case ACTION_CLEAR_RANDOM_RESULT:
      return {
        ...state,
        homeRecipeList: null,
      }

    case ACTION_PUT_RESULT_RANDOM_LIST:
      // console.log('duplicate', findDuplicateInArray(action.list));
      return {
        ...state,
        homeRecipeList: action.list
      }

    case ACTION_PUSH_RESULT_RANDOM_LIST:
      if (!state.homeRecipeList) {
        state.homeRecipeList = [];
      }
      const newList = getUniqueArray(state.homeRecipeList.concat(action.list));

      // console.log('duplicate', findDuplicateInArray(newList));
      // console.log('duplicate', 'ACTION_PUSH_RESULT_RECIPES_LIST');
      return {
        ...state,
        homeRecipeList: newList,
      };

    case ACTION_UPDATE_RECIPE:
      return {
        ...state,
        homeRecipeList: state.homeRecipeList ? state.homeRecipeList.map(item => {
          if (item.id === action.recipe.id) {
            return Object.assign({}, item, action.recipe);
          }
          return item;
        }) : null,
      };

    default:
      return state;
  }
};
