import {
  ACTION_CATEGORY_FETCH_SUCCESS,
  ACTION_CUISINE_FETCH_ERROR,
  ACTION_CUISINE_FETCH_START,
  ACTION_CUISINE_FETCH_SUCCESS,
} from "../actionTypes";
import ConfigApp from "../../utils/ConfigApp";
import axios from "axios";
import {cachingCategoriesImage, cachingCuisineImage} from "../../utils/utils";
import {translating} from "../../utils/Translating";

export function fetchCuisine() {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: ACTION_CUISINE_FETCH_START,
    })
    axios.get(ConfigApp.URL + 'json/data_chefs.php')
      .then((response) => {
        if (response && response.data) {
          const cuisines = response.data;
          /*translating(cuisines, 'chef_title')
            .then(res => {
              dispatch({
                type: ACTION_CUISINE_FETCH_SUCCESS,
                cuisines: res,
              })
              cachingCuisineImage(res);
              return resolve();
            })
            .catch(err => {
              console.log('translatingError', err);
            });*/
          dispatch({
            type: ACTION_CUISINE_FETCH_SUCCESS,
            cuisines,
          })
          cachingCuisineImage(cuisines);
          return resolve();
        }
        return reject({message: "invalid response"});
      }).catch((error) => {
      return dispatch({
        type: ACTION_CUISINE_FETCH_ERROR,
        error,
      })
    })
  })
}
