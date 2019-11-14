import {
  ACTION_CATEGORY_FETCH_ERROR,
  ACTION_CATEGORY_FETCH_START,
  ACTION_CATEGORY_FETCH_SUCCESS,
  ACTION_UPDATE_RECIPE
} from "../actionTypes";
import ConfigApp from "../../utils/ConfigApp";
import axios from "axios";
import {cachingCategoriesImage} from "../../utils/utils";
import apiRequest from "../../utils/apiRequest";
import {translateObject, translating} from "../../utils/Translating";

export function fetchCategory() {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: ACTION_CATEGORY_FETCH_START,
    })
    axios.get(ConfigApp.URL + 'json/data_categories.php')
      .then((response) => {
        if (response && response.data) {
          const categories = response.data;
         /* translating(categories, 'category_title')
            .then(res => {
              dispatch({
                type: ACTION_CATEGORY_FETCH_SUCCESS,
                categories: res,
              })
              cachingCategoriesImage(res);
              return resolve();
            })
            .catch(err => {
              console.log('translatingError', err);
            });*/
          dispatch({
            type: ACTION_CATEGORY_FETCH_SUCCESS,
            categories,
          })
          cachingCategoriesImage(categories);
          return resolve();
        }
        return reject({message: "invalid response"});
      }).catch((error) => {
      return dispatch({
        type: ACTION_CATEGORY_FETCH_ERROR,
        error,
      })
    })
  })
}
