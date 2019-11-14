import {
  ACTION_CLEAR_KEYWORD,
  ACTION_CLEAR_RECIPES_BY_CATEGORY,
  ACTION_CLEAR_RESULT_RECIPES_BY_CUISINE,
  ACTION_CLEAR_SEARCH_RESULT,
  ACTION_FINISH_RECIPES_BY_CATEGORY,
  ACTION_FINISH_SEARCH,
  ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE,
  ACTION_PUSH_RECIPES_BY_CATEGORY,
  ACTION_PUSH_RESULT_RECIPES_BY_CUISINE,
  ACTION_PUSH_RESULT_RECIPES_LIST,
  ACTION_PUT_RESULT_RANDOM_LIST,
  ACTION_PUT_RESULT_RECIPES_LIST,
  ACTION_START_GET_RECIPES_BY_CATEGORY,
  ACTION_START_SEARCH,
  ACTION_START_SEARCH_RECIPES_BY_CUISINE,
  ACTION_UPDATE_OFFSET
} from "../actionTypes";
import axios from "axios";
import ConfigApp from "../../utils/ConfigApp";
import {convertRecipesSpoonacularToCookAid, getSpoonacularTypeOrDiet} from "../../utils/utils";

const supportCuisineSAPI = [
  "african",
  "american",
  "british",
  "cajun",
  "caribbean",
  "chinese",
  "eastern",
  "european",
  "french",
  "german",
  "greek",
  "indian",
  "irish",
  "italian",
  "japanese",
  "jewish",
  "korean",
  "latin",
  "mediterranean",
  "mexican",
  "middle",
  "nordic",
  "southern",
  "spanish",
  "thai",
  "vietnamese",
];

export function search(keyword, isJustSpoonacular = false, offset = 0, numberPerPage = 10) {
  return dispatch => {
    if (!keyword) {
      return;
    }
    return dispatch(searchBothAPI(keyword, isJustSpoonacular, offset, numberPerPage));
  }
}

export function getRandomSpoonacularRecipes(numberPerPage = 10) {
  return dispatch => {
    return dispatch(searchRandomSpoonacular(null, 0, numberPerPage));
  }
}

export function searchBothAPI(keyword, isJustSpoonacular = false, offset = 0, numberPerPage = 10) {
  return dispatch => {
    if (offset === 0) {
      dispatch(clearSearchResult())
    }
    dispatch(startSearch(keyword));
    const promises = [];

    if (!isJustSpoonacular) {
      const searchCookAid = dispatch(searchFromCookAid(keyword, offset, numberPerPage));
      promises.push(searchCookAid);
      searchCookAid.then(results => {
        dispatch(pushResultRecipes(results));
        return results;
      });
    }

    const searchSpoonacular = dispatch(searchFromSpoonacular(keyword, offset, numberPerPage));
    promises.push(searchSpoonacular);
    searchSpoonacular.then(results => {
      dispatch(pushResultRecipes(results));
      return results;
    });

    Promise.all(promises)
      .then(results => {
        if (results && results.length > 0) {
          return dispatch(finishSearch());
        }
        return dispatch(finishSearch(false));
      })
      .catch(error => {
        return dispatch(finishSearch(false));
      })
  }
}

export function searchRandomSpoonacular(keyword, offset = 0, numberPerPage = 10) {
  return dispatch => {
    dispatch(startSearch(keyword));
    dispatch(clearRandomResult());
    const searchSpoonacular = dispatch(searchFromSpoonacular(keyword, offset, numberPerPage));
    searchSpoonacular.then(results => {
      if (results) {
        dispatch(putRandomResult(results));
        return dispatch(finishSearch());
      }
      return dispatch(finishSearch(false));
    }).catch(error => {
      return dispatch(finishSearch(false));
    })
  }
}

export function searchNextPage() {
  return (dispatch, getState) => {
    const state = getState();
    let offset = state.recipes.offset;
    const numberPerPage = state.recipes.numberPerPage;
    const keyword = state.recipes.keyword;
    const totalResults = state.recipes.totalResults;
    offset +=numberPerPage;
    if (offset > totalResults) {
      return;
    }
    dispatch(search(keyword,true, offset, numberPerPage));
  }
}
function searchFromCookAid(keyword, offset, numberPerPage) {
  return dispatch => new Promise((resolve, reject) => {
    if (!keyword) {
      reject({message: "empty keyword"})
    }
    axios.get(`${ConfigApp.URL}json/data_search.php`, {
      params: {
        string: keyword,
      }
    }).then((response) => {
      if (response && response.data == 'false') {
        return reject({message: "invalid response"});
      }
      return resolve(response.data);
    }).catch((error) => {
      return reject(error);
    })
  })
}

function searchFromSpoonacular(keyword, offset, numberPerPage, cuisine = null, diet = null, type = null) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${ConfigApp.SPOONACULAR_API_URL}/recipes/complexSearch`, {
      params: {
        query: keyword,
        cuisine,
        diet,
        type,
        instructionsRequired: true,
        addRecipeInformation: true,
        minCalories: 0,
        fillIngredients: true,
        offset,
        number: numberPerPage,
        apiKey: ConfigApp.SPOONACULAR_API_KEY,
      }
    }).then(async (response) => {
      if (response && response.data && response.data.results) {
        const recipes = await convertRecipesSpoonacularToCookAid(response.data.results, cuisine, diet, type);
        const offset = response.data.offset;
        const number = response.data.number;
        const totalResults = response.data.totalResults;
        dispatch(updateOffset(offset, numberPerPage, totalResults));
        return resolve(recipes);
      }
      return reject({message: "invalid response"});
    }).catch((error) => {
      return reject(error);
    })
  })
}


export function clearSearchResult() {
  return dispatch => {
    dispatch({
      type: ACTION_CLEAR_SEARCH_RESULT,
    })
  }
}
export function clearRandomResult() {
  return dispatch => {
    dispatch({
      type: ACTION_CLEAR_SEARCH_RESULT,
    })
  }
}

export function putRandomResult(list) {
  return dispatch => {
    dispatch({
      type: ACTION_PUT_RESULT_RANDOM_LIST,
      list,
    })
  }
}

export function startSearch(keyword) {
  return dispatch => {
    dispatch({
      type: ACTION_START_SEARCH,
      keyword,
    })
  }
}

export function finishSearch(success = true) {
  return dispatch => {
    dispatch({
      type: ACTION_FINISH_SEARCH,
      success,
    })
  }
}

export function setResultRecipes(recipes) {
  return dispatch => {
    dispatch({
      type: ACTION_PUT_RESULT_RECIPES_LIST,
      recipeList: recipes,
    })
  }
}

export function pushResultRecipes(recipes) {
  return dispatch => {
    dispatch({
      type: ACTION_PUSH_RESULT_RECIPES_LIST,
      recipeList: recipes,
    })
  }
}

export function updateOffset(offset, numberPerPage, totalResults) {
  return dispatch => {
    dispatch({
      type: ACTION_UPDATE_OFFSET,
      offset: offset,
      numberPerPage: numberPerPage,
      totalResults: totalResults,
    })
  }
}

export function clearKeyword() {
  return dispatch => {
    dispatch({
      type: ACTION_CLEAR_KEYWORD,
    })
  }
}

export function searchRecipesByCuisine(cuisine, isJustSpoonacular = false, offset = 0, numberPerPage = 10) {
  return dispatch => {
    dispatch({
      type: ACTION_START_SEARCH_RECIPES_BY_CUISINE,
    })
    const promises = [];
    if (!isJustSpoonacular) {
      const searchCookAid = dispatch(getRecipesByCuisineCookAid(cuisine.IdChef, offset, numberPerPage));
      promises.push(searchCookAid);
      searchCookAid.then(results => {
        dispatch({
          type: ACTION_PUSH_RESULT_RECIPES_BY_CUISINE,
          recipes: results,
        });
        return results;
      });
    }
    const isSAPISupported = supportCuisineSAPI.indexOf(cuisine.Cuisine ? cuisine.Cuisine.toLowerCase() : cuisine.Cuisine) >= 0;
    const searchSpoonacular = dispatch(searchFromSpoonacular(!isSAPISupported ? cuisine.Cuisine : "", offset, numberPerPage, isSAPISupported ? cuisine.TitleChef : null));
    promises.push(searchSpoonacular);
    searchSpoonacular.then(results => {
      dispatch({
        type: ACTION_PUSH_RESULT_RECIPES_BY_CUISINE,
        recipes: results,
      });
      return results;
    });

    Promise.all(promises)
      .then(results => {
        if (results && results.length > 0) {
          return dispatch({
            type: ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE,
            isSuccess: true,
          });
        }
        return dispatch({
          type: ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE,
          isSuccess: false,
        });
      })
      .catch(error => {
        return dispatch({
          type: ACTION_FINISH_SEARCH_RECIPES_BY_CUISINE,
          isSuccess: false,
        });
      })

  }
}

export function getRecipesByCuisineCookAid(cuisineId) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${ConfigApp.URL}json/data_recipes_chef.php`, {
      params: {
        chef: cuisineId,
      }
    }).then((response) => {
      if (response && response.data == 'false') {
        return reject({message: "invalid response"});
      }
      return resolve(response.data);
    }).catch((error) => {
      return reject(error);
    })
  })
}

export function clearRecipesByCuisine() {
  return dispatch => {
    dispatch({
      type: ACTION_CLEAR_RESULT_RECIPES_BY_CUISINE,
    })
  }
}

export function searchNextPageCuisine(cuisine) {
  return (dispatch, getState) => {
    const state = getState();
    let offset = state.recipes.offset;
    const numberPerPage = state.recipes.numberPerPage;
    const keyword = state.recipes.keyword;
    const totalResults = state.recipes.totalResults;
    offset +=numberPerPage;
    if (offset > totalResults) {
      return;
    }
    dispatch(searchRecipesByCuisine(cuisine,true, offset, numberPerPage));
  }
}

export function getRecipesByCategoryCookAid(category) {
  return dispatch => new Promise((resolve, reject) => {
    if (!category) {
      reject('empty category');
    }
    axios.get(`${ConfigApp.URL}json/data_recipes_category.php`, {
      params: {
        category: category.IdCategory,
      }
    }).then((response) => {
      if (response && response.data == 'false') {
        return reject({message: "invalid response"});
      }
      return resolve(response.data);
    }).catch((error) => {
      return reject(error);
    })
  })
}

export function getRecipesByCategory(category, isJustSpoonacular = false, offset = 0, numberPerPage = 10) {
  return dispatch => {
    dispatch({
      type: ACTION_START_GET_RECIPES_BY_CATEGORY,
    })
    const promises = [];
    if (!isJustSpoonacular) {
      const searchCookAid = dispatch(getRecipesByCategoryCookAid(category, offset, numberPerPage));
      promises.push(searchCookAid);
      searchCookAid.then(results => {
        dispatch({
          type: ACTION_PUSH_RECIPES_BY_CATEGORY,
          recipes: results,
        });
        return results;
      });
    }
    const {diet, type, keyword} = getSpoonacularTypeOrDiet(category.Category);
    const searchSpoonacular = dispatch(searchFromSpoonacular(keyword, offset, numberPerPage, null, diet, type));
    promises.push(searchSpoonacular);
    searchSpoonacular.then(results => {
      dispatch({
        type: ACTION_PUSH_RECIPES_BY_CATEGORY,
        recipes: results,
      });
      return results;
    });

    Promise.all(promises)
      .then(results => {
        if (results && results.length > 0) {
          return dispatch({
            type: ACTION_FINISH_RECIPES_BY_CATEGORY,
            isSuccess: true,
          });
        }
        return dispatch({
          type: ACTION_FINISH_RECIPES_BY_CATEGORY,
          isSuccess: false,
        });
      })
      .catch(error => {
        return dispatch({
          type: ACTION_FINISH_RECIPES_BY_CATEGORY,
          isSuccess: false,
        });
      })
  }
}

export function clearRecipesByCategory() {
  return dispatch => {
    dispatch({
      type: ACTION_CLEAR_RECIPES_BY_CATEGORY,
    })
  }
}

export function searchNextPageRecipesCategory(category) {
  return (dispatch, getState) => {
    const state = getState();
    let offset = state.recipes.offset;
    const numberPerPage = state.recipes.numberPerPage;
    const totalResults = state.recipes.totalResults;
    offset +=numberPerPage;
    if (offset > totalResults) {
      return;
    }
    dispatch(getRecipesByCategory(category,true, offset, numberPerPage));
  }
}
