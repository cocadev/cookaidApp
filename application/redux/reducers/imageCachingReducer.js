import {
  ACTION_IMAGE_CACHING_ADD_QUEUE,
  ACTION_IMAGE_CACHING_DOWNLOAD_FAILED,
  ACTION_IMAGE_CACHING_DOWNLOAD_START,
  ACTION_IMAGE_CACHING_DOWNLOAD_SUCCESS
} from "../actionTypes";

const initialState = {
  queueTask: [],
  processingTask: [],
  successTask: [],
  failedTask: [],
};

export default imageCaching = (state = initialState, action) => {

  switch (action.type) {

    case ACTION_IMAGE_CACHING_ADD_QUEUE:
      const filtedInQueue = state.queueTask.filter(item => item.uri === action.uri);
      const filtedInProgress = state.processingTask.filter(item => item.uri === action.uri);
      if (filtedInQueue && filtedInQueue.length > 0 || filtedInProgress && filtedInProgress.length > 0) {
        return {
          ...state,
        }
      }
      return {
        ...state,
        queueTask: [
          ...state.queueTask,
          {
            uri: action.uri,
            path: action.path,
          }
        ]
      }

    case ACTION_IMAGE_CACHING_DOWNLOAD_START:
      return {
        ...state,
        queueTask: state.queueTask.filter(item => item.uri !== action.uri),
        processingTask: [
          ...state.processingTask,
          {
            uri: action.uri,
            path: action.path,
          }
        ]
      }

    case ACTION_IMAGE_CACHING_DOWNLOAD_SUCCESS:

      const successTask = state.successTask && state.successTask.length > 100 ? state.successTask.slice(50) : state.successTask;

      return {
        ...state,
        processingTask: state.processingTask.filter(item => item.uri !== action.uri),
        successTask: [
          ...successTask,
          {
            uri: action.uri,
            path: action.path,
          }
        ]
      }

    case ACTION_IMAGE_CACHING_DOWNLOAD_FAILED:
      return {
        ...state,
        processingTask: state.processingTask.filter(item => item.uri !== action.uri),
        failedTask: [
          ...state.failedTask,
          {
            uri: action.uri,
            path: action.path,
          }
        ]
      }

    default:
      return state;
  }
};
