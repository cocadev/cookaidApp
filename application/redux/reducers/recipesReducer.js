import {
  ACTION_CLEAR_KEYWORD,
  ACTION_CLEAR_RANDOM_RESULT, ACTION_CLEAR_RECIPES_BY_CATEGORY,
  ACTION_CLEAR_RESULT_RECIPES_BY_CUISINE,
  ACTION_CLEAR_SEARCH_RESULT, ACTION_FINISH_RECIPES_BY_CATEGORY,
  ACTION_FINISH_SEARCH,
  ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE, ACTION_PUSH_RECIPES_BY_CATEGORY,
  ACTION_PUSH_RESULT_RECIPES_BY_CUISINE,
  ACTION_PUSH_RESULT_RECIPES_LIST,
  ACTION_PUT_RESULT_RANDOM_LIST,
  ACTION_PUT_RESULT_RECIPES_LIST, ACTION_START_GET_RECIPES_BY_CATEGORY,
  ACTION_START_SEARCH,
  ACTION_START_SEARCH_RECIPES_BY_CUISINE,
  ACTION_UPDATE_OFFSET,
  ACTION_UPDATE_RECIPE,
} from "../actionTypes";
import {getUniqueArray} from "../../utils/utils";


const initialState = {
  recipeList: null,
  isLoading: false,
  isSuccess: null,
  isError: null,
  keyword: null,
  offset: null,
  numberPerPage: 10,
  totalResults: null,
  recipesByCuisine: null,
  recipesByCategory: null,
};

export default order = (state = initialState, action) => {

  switch (action.type) {

    case ACTION_START_SEARCH:
      return {
        ...state,
        isLoading: true,
        isSuccess: null,
        isError: null,
        keyword: action.keyword,
      };

    case ACTION_PUT_RESULT_RECIPES_LIST:
      return {
        ...state,
        recipeList: getUniqueArray(action.recipeList),
      };

    case ACTION_FINISH_SEARCH:
      return {
        ...state,
        isLoading: false,
        isSuccess: action.success,
        isError: !action.success,
      };

    case ACTION_UPDATE_OFFSET:
      return {
        ...state,
        offset: action.offset,
        numberPerPage: action.numberPerPage,
        totalResults: action.totalResults,
      };

    case ACTION_CLEAR_SEARCH_RESULT:
      return {
        ...state,
        recipeList: null,
        offset: null,
        numberPerPage: null,
        totalResults: null,
      }

    case ACTION_PUSH_RESULT_RECIPES_LIST:
      if (!state.recipeList) {
        state.recipeList = [];
      }
/*      const newList = state.recipeList.concat(action.recipeList).sort((a, b) => {
        if (a && b && a.recipe_title < b.recipe_title) {
          return -1;
        }
        if (a && b && a.recipe_title > b.recipe_title) {
          return 1;
        }
        return 0;
      });*/
      const newList = getUniqueArray(state.recipeList.concat(action.recipeList));
      return {
        ...state,
        recipeList: newList,
      };

    case ACTION_CLEAR_KEYWORD:
      return {
        ...state,
        keyword: null,
      }

    case ACTION_START_SEARCH_RECIPES_BY_CUISINE:
      return {
        ...state,
        isLoading: true,
        isSuccess: null,
        isError: null,
      }

    case  ACTION_PUSH_RESULT_RECIPES_BY_CUISINE:
      if (!state.recipesByCuisine) {
        state.recipesByCuisine = [];
      }
      return {
        ...state,
        recipesByCuisine: getUniqueArray(state.recipesByCuisine.concat(action.recipes))
      }

    case ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE:
      return {
        ...state,
        isLoading: false,
        isSuccess: action.isSuccess,
        isError: !action.isSuccess,
      }

    case ACTION_CLEAR_RESULT_RECIPES_BY_CUISINE:
      return {
        ...state,
        recipesByCuisine: null,
        offset: null,
        numberPerPage: null,
        totalResults: null,
      }

    case ACTION_START_GET_RECIPES_BY_CATEGORY:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      }

    case ACTION_CLEAR_RECIPES_BY_CATEGORY:
      return {
        ...state,
        recipesByCategory: null,
        offset: null,
        numberPerPage: null,
        totalResults: null,
      }

    case ACTION_PUSH_RECIPES_BY_CATEGORY:
      if (!state.recipesByCategory) {
        state.recipesByCategory = [];
      }
      return {
        ...state,
        recipesByCategory: getUniqueArray(state.recipesByCategory.concat(action.recipes))
      }

    case ACTION_FINISH_RECIPES_BY_CATEGORY:
      return {
        ...state,
        isLoading: false,
        isSuccess: action.isSuccess,
        isError: !action.isSuccess,
      }

    case ACTION_UPDATE_RECIPE:

      return {
        ...state,
        recipeList: state.recipeList ? state.recipeList.map(item => {
          if (item.id === action.recipe.id) {
            return Object.assign(item, action.recipe);
          }
          return item;
        }) : null,
        recipesByCuisine: state.recipesByCuisine ? state.recipesByCuisine.map(item => {
          if (item.id === action.recipe.id) {
            return Object.assign(item, action.recipe);
          }
          return item;
        }) : null,
        recipesByCategory: state.recipesByCategory ? state.recipesByCategory.map(item => {
          if (item.id === action.recipe.id) {
            return Object.assign(item, action.recipe);
          }
          return item;
        }) : null,
      };

    default:
      return state;
  }
};
