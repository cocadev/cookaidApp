import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";
import {Platform} from "react-native";
import {getStore} from "../redux/index";
import {addCachingQueue} from "../redux/actions/imageCachingActions";

const {store} = getStore();

function prefetch(uri) {
  return new Promise((resolve, reject) => {
    const name = shorthash.unique(uri);
    const extension = (Platform.OS === 'android') ? 'file://' : '';
    const fileExtension = uri.match(/\.[0-9a-z]+$/i)[0] || '.png';
    const path =`${extension}${FileSystem.cacheDirectory}/${name}${fileExtension}`;
    if (store) {
      store.dispatch(addCachingQueue(uri, path));
    } else {
      FileSystem.getInfoAsync(path)
        .then(({ exists, isDirectory }) => {
          if(exists) {
            // console.log('prefetch', `${uri} cached`);
            return resolve();
          } else {
            return downloadFile(uri,path)
              .then(resolve)
              .catch(reject)
          }
        })
    }
  })
}

function downloadFile(uri, path) {
  return FileSystem.downloadAsync(uri, path)
    .then(() => {
      // console.log('prefetch', uri);
    })
}

export default {prefetch};
