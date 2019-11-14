import { ACTION_SET_SELECTED_LANGUAGE } from "../actionTypes";
import { AsyncStorage } from 'react-native';
import { getSelectedLanguage } from "../../utils/Translating";
import { Updates } from 'expo';

export function setSelectedLanguage(language) {
  return dispatch => {
    AsyncStorage.setItem("selected_language", JSON.stringify(language), () => {
      getSelectedLanguage();
    });

    dispatch({
      type: ACTION_SET_SELECTED_LANGUAGE,
      language,
    })
    Updates.reload();
  }
}
