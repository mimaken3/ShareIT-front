import { SHOW_ALL_USERS } from "../actions/user";
import _ from "lodash";

// reducers/index.jsに渡すためexport
// reducerは関数として定義(引数は2つ)
// 第一引数に初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
export default (users = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_USERS:
      return _.mapKeys(action.response.data, "user_id");
    default:
      return users;
  }
};
