import axios from "axios";
import ConfigApp from "../../utils/ConfigApp";
import {
  ACTION_CLEAR_RANDOM_RESULT,
  ACTION_FINISH_FETCHING_RANDOM, ACTION_PUSH_RESULT_RANDOM_LIST, ACTION_PUT_RESULT_RANDOM_LIST,
  ACTION_START_FETCHING_RANDOM,
  ACTION_UPDATE_RANDOM_OFFSET,
  ACTION_UPDATE_RECIPE
} from "../actionTypes";
import {convertRecipesSpoonacularToCookAid, findDuplicateInArray} from "../../utils/utils";

export function getRecipeNutrition(recipe) {
  return dispatch => new Promise((resolve, reject) => {

    if (!recipe) {
      return reject("invalid recipe");
    }
    axios.get(`${ConfigApp.SPOONACULAR_API_URL}/recipes/${recipe.id}/nutritionWidget.json`, {
      params: {
        apiKey: ConfigApp.SPOONACULAR_API_KEY,
      }
    }).then((response) => {
      if (response && response.data) {
        dispatch({
          type: ACTION_UPDATE_RECIPE,
          recipe: {
            id: recipe.id,
            customNutrition: response.data,
          }
        })
        return resolve(Object.assign(recipe, {customNutrition: response.data}));
      }
      return reject({message: "invalid response"});
    }).catch((error) => {
      return reject(error);
    })
  });
}

export function getRecipeInformation(recipeId) {
  return dispatch => new Promise((resolve, reject) => {
    if (!recipeId) {
      return reject("invalid recipe");
    }
    axios.get(`${ConfigApp.SPOONACULAR_API_URL}/recipes/${recipeId}/information`, {
      params: {
        includeNutrition: true,
        apiKey: ConfigApp.SPOONACULAR_API_KEY,
      }
    }).then((response) => {
      if (response && response.data) {
        const item = response.data;
        if (item && item.nutrition && item.nutrition.nutrients) {
          const filtedCal = item.nutrition.nutrients.filter(i => i.title && i.title.toLowerCase() === "calories");
          if (filtedCal && filtedCal[0]) {
            item.recipe_cals =  Math.round(filtedCal[0].amount);
          }
        }
        dispatch({
          type: ACTION_UPDATE_RECIPE,
          recipe: {
            id: recipeId,
            ... item,
          }
        });
        return resolve(response.data);
      }
      return reject({message: "invalid response"});
    }).catch((error) => {
      return reject(error);
    })
  });
}

export function getBulkRecipeInformation(recipes) {
  return new Promise((resolve, reject) => {
    const ids = recipes.map(item => item.id).join(',');
    axios.get(`${ConfigApp.SPOONACULAR_API_URL}/recipes/informationBulk`, {
      params: {
        ids,
        // limitLicense: true,
        apiKey: ConfigApp.SPOONACULAR_API_KEY,
        includeNutrition: true,
      }
    }).then((response) => {
      if (response && response.data) {
        response.data.map(detailInfo => {
          let recipe = recipes.find(i => i.id === detailInfo.id);
          if (recipe) {
            if (detailInfo && detailInfo.nutrition && detailInfo.nutrition.nutrients) {
              const filtedCal = detailInfo.nutrition.nutrients.filter(i => i.title && i.title.toLowerCase() === "calories");
              if (filtedCal && filtedCal[0]) {
                recipe.recipe_cals =  Math.round(filtedCal[0].amount);
              }
            }
            recipe = Object.assign(recipe, detailInfo);
          }
        })
        return resolve(recipes);
      }
      return reject({message: "invalid response"});
    }).catch((error) => {
      return reject(error);
    })
  })
}

export function startRandomFetching() {
  return dispatch => {
    dispatch({
      type: ACTION_START_FETCHING_RANDOM,
    })
  }
}

export function finishRandomFetching(isSuccess) {
  return dispatch => {
    dispatch({
      type: ACTION_FINISH_FETCHING_RANDOM,
      success: isSuccess,
    })
  }
}

export function clearRandomRecipes() {
  return dispatch => {
    dispatch({
      type: ACTION_CLEAR_RANDOM_RESULT,
    })
  }
}

export function fetchRandomRecipes(number) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(startRandomFetching());
    axios.get(`${ConfigApp.SPOONACULAR_API_URL}/recipes/random`, {
      params: {
        number,
        // limitLicense: true,
        apiKey: ConfigApp.SPOONACULAR_API_KEY,
      }
    }).then(async (response) => {
      if (response && response.data) {
        try {
          let recipes = convertRecipesSpoonacularToCookAid(response.data.recipes);
          recipes = await getBulkRecipeInformation(recipes);
          dispatch({
            type: ACTION_PUSH_RESULT_RANDOM_LIST,
            list: recipes,
          });
          dispatch(finishRandomFetching(true));
        } catch (e) {
          return reject(e);
        }
        return resolve(response.data);
      }
      return reject({message: "invalid response"});
    }).catch((error) => {
      dispatch(finishRandomFetching(false));
      return reject(error);
    })
  })
}
