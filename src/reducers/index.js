import { combineReducers } from "redux";
import users from "./users";
import articles from "./articles";
import topics from "./topics";
import auth from "./auth";
import { reducer as form } from "redux-form";

const appReducer = combineReducers({
  users,
  articles,
  topics,
  auth,
  form,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER_EVENT") {
    localStorage.removeItem("shareIT_token");

    // storeを空に
    state = undefined;
  }
  return appReducer(state, action);
};

// storeで使うのでexportを付ける
export default rootReducer;
