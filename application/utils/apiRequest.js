import axios from "axios";

export default function apiRequest() {
  const instance = axios.create();

  instance.interceptors.response.use( function (response) {
    console.log('result', response.data)
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return instance;
}
