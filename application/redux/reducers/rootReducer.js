import {combineReducers} from "redux";
import recipes from "./recipesReducer";
import category from "./categoryReducer";
import cuisine from "./cuisineReducer";
import caching from "./imageCachingReducer";
import homeRecipes from "./homeRecipesReducer";

export default function getRootReducer() {
  return combineReducers({
    recipes,
    category,
    cuisine,
    caching,
    homeRecipes,
  });
}
