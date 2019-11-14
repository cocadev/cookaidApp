import {
  ACTION_IMAGE_CACHING_ADD_QUEUE, ACTION_IMAGE_CACHING_DOWNLOAD_FAILED,
  ACTION_IMAGE_CACHING_DOWNLOAD_START,
  ACTION_IMAGE_CACHING_DOWNLOAD_SUCCESS
} from "../actionTypes";
import * as FileSystem from "expo-file-system";

const NUMBER_PARALLEL_DOWNLOAD = 30;

export function addCachingQueue(uri, path) {
  return dispatch => {
    dispatch({
      type: ACTION_IMAGE_CACHING_ADD_QUEUE,
      uri,
      path,
    })
    dispatch(process());
  }
}

export function startDownload(uri, path) {
  return dispatch => {
    dispatch({
      type: ACTION_IMAGE_CACHING_DOWNLOAD_START,
      uri,
      path,
    })
  }
}

export function downloadSuccess(uri, path) {
  return dispatch => {
    dispatch({
      type: ACTION_IMAGE_CACHING_DOWNLOAD_SUCCESS,
      uri,
      path,
    });
    dispatch(process());
  }
}

export function downloadFailed(uri, path) {
  return dispatch => {
    dispatch({
      type: ACTION_IMAGE_CACHING_DOWNLOAD_FAILED,
      uri,
      path,
    })
    dispatch(process());
  }
}

export function process() {
  return (dispatch, getState) => {
    const { caching } = getState();
    const queueTask = caching.queueTask;
    const processingTask = caching.processingTask;
    // console.log('queueTask', queueTask);
    // console.log('processingTask', processingTask);
    if (queueTask && queueTask.length > 0 && (!processingTask || processingTask && processingTask.length < NUMBER_PARALLEL_DOWNLOAD)) {
      const task = queueTask[queueTask.length - 1];
      dispatch(startDownload(task.uri, task.path));
      downloadFile(task.uri, task.path)
        .then(() => {
          dispatch(downloadSuccess(task.uri, task.path))
        })
        .catch(err => {
          dispatch(addCachingQueue(task.uri, task.path))
        })
    }
  }
}

function downloadFile(uri, path) {
  return FileSystem.downloadAsync(uri, path)
    .then(() => {
      // console.log('prefetch', uri);
    })
}
