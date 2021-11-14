import { combineReducers } from "redux";
//reducer defined for each feature
import postReducer from "./post";

const rootReducer = combineReducers({
    //store -> state.posts  -> response -> postReducer
    posts: postReducer
})

export default rootReducer;

