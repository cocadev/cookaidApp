import axios from "axios";
import ConfigApp from "../../utils/ConfigApp";
import {
  ACTION_CLEAR_RANDOM_RESULT,
  ACTION_FINISH_FETCHING_RANDOM,
  ACTION_PUSH_RESULT_RANDOM_LIST, ACTION_PUT_RESULT_RANDOM_LIST,
  ACTION_START_FETCHING_RANDOM,
  ACTION_UPDATE_RECIPE
} from "../actionTypes";
import { convertRecipesSpoonacularToCookAid } from "../../utils/utils";
import {
  getTargetLanguage,
  translatePromptStringArray,
  translatePromt,
  translateRecipe,
} from "../../utils/Translating";

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
        return resolve(Object.assign({}, { customNutrition: response.data }));
      }
      return reject({ message: "invalid response" });
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
    // console.log('getRecipeInformation');
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
            item.recipe_cals = Math.round(filtedCal[0].amount);
          }
        }
        translateRecipe(item)
          .then(translated => {
            // console.log('translated', translated)
            dispatch({
              type: ACTION_UPDATE_RECIPE,
              recipe: {
                id: recipeId,
                ...translated,
              }
            });
            return resolve(translated);
          })
          .catch(err => {
            return resolve(response.data)
          })
        /* dispatch({
           type: ACTION_UPDATE_RECIPE,
           recipe: {
             id: recipeId,
             ... item,
           }
         });*/
        return;
      }
      return reject({ message: "invalid response" });
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
                recipe.recipe_cals = Math.round(filtedCal[0].amount);
              }
            }
            recipe = Object.assign(recipe, detailInfo);
          }
        })
        return resolve(recipes);
      }
      return reject({ message: "invalid response" });
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
          // const timeStart = Date.now();
          // console.log('timeStart', Date.now());
          let recipes = await convertRecipesSpoonacularToCookAid(response.data.recipes, null, null, null, false);
          // console.log('timeEnd1', Date.now() - timeStart);
          recipes = await getBulkRecipeInformation(recipes);

          // console.log('timeEnd2', Date.now() - timeStart);

          let emptyTitle = recipes.map(item => {
            const cloned = Object.assign({}, item);
            cloned["recipe_title"] = null;
            return cloned;
          });

          /*dispatch({
            type: ACTION_PUT_RESULT_RANDOM_LIST,
            list: emptyTitle,
          });*/
          const targetLanguage = getTargetLanguage();
          let arrayRecipeTitle = recipes.map(recipe => recipe['recipe_title']);
          let translatedRecipeTitles = await translatePromptStringArray(arrayRecipeTitle, targetLanguage);
          translatedRecipeTitles.map((item, index) => {
            emptyTitle[index] = Object.assign(emptyTitle[index], { recipe_title: item, recipe_title_translated: targetLanguage })
          });

          dispatch({
            type: ACTION_PUT_RESULT_RANDOM_LIST,
            list: emptyTitle,
          });
          dispatch(finishRandomFetching(true));
        } catch (e) {
          return reject(e);
        }
        return resolve(response.data);
      }
      return reject({ message: "invalid response" });
    }).catch((error) => {
      dispatch(finishRandomFetching(false));
      return reject(error);
    })
  })
}

function translateMultiRecipe(recipes) {
  return dispatch => {
    if (!recipes || !Array.isArray(recipes)) {
      return;
    }
    recipes.map(async (recipe) => {
      // console.log('translate', recipe['recipe_title']);
      const translatedRecipe = await translateRecipe(recipe);
      dispatch({
        type: ACTION_UPDATE_RECIPE,
        recipe: translatedRecipe
      });
    })
  }
}

export function translateSingleRecipe(recipe) {
  return (dispatch) => {
    if (!recipe) {
      return;
    }
    translateRecipe(recipe)
      .then(translatedRecipe => {
        dispatch({
          type: ACTION_UPDATE_RECIPE,
          recipe: translatedRecipe
        });
      })
      .catch(err => {
        console.log('translateSingleRecipe', 'error', err)
      })

  }
}
