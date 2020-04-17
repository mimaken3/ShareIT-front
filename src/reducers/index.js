import { combineReducers } from "redux";
import users from "./users";
import articles from "./articles";
import topics from "./topics";
import auth from "./auth";
import { reducer as form } from "redux-form";

// storeで使うのでexportを付ける
export default combineReducers({ users, articles, topics, auth, form });
