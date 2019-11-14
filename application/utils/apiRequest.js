import axios from "axios";
import {translateObject} from "./Translating";
import Localization from "expo-localization";

export default function apiRequest() {
  const instance = axios.create();

  instance.interceptors.response.use( function (response) {
    // response.data = await translateObject(response.data, Localization.locale);
    console.log('result', response.data)
    /*translateObject(response.data, Localization.locale)
      .then(result => {
        console.log('result', result)
        response.data = result
      })*/
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return instance;
}
