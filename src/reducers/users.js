import {
  CREATE_USER_EVENT,
  SHOW_ALL_USERS,
  SHOW_USER_DETAIL,
  UPDATE_USER_EVENT,
  USER_NOT_EXIST,
  LOGIN_FAILED,
} from "Actions/user";
import _ from "lodash";

// reducers/index.jsに渡すためexport
// reducerは関数として定義(引数は2つ)
// 第一引数に初期値はないので{}
// 受け取ったactionのtypeに応じて状態を変更して、その結果を返す
let initialState = {
  auth_fail: false,
  is_empty: true,
  ref_pg: 0,
  all_paging_num: 0,
  users: {},
};
export default (users = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL_USERS:
      localStorage.removeItem("currentPage");
      localStorage.setItem("currentPage", action.response.data.ref_pg);

      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: action.response.data.is_empty,
        ref_pg: action.response.data.ref_pg,
        all_paging_num: action.response.data.all_paging_num,
        users: _.mapKeys(action.response.data.users, "user_id"),
      });

    case CREATE_USER_EVENT:
    case SHOW_USER_DETAIL:
    case UPDATE_USER_EVENT:
      const data = action.response.data;
      // [data.user_id]をkeyとしたdataというオブジェクトを持って、上書きした情報をまるっとわたす
      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: false,
        ref_pg: 0,
        all_paging_num: 0,
        users: { ...users.users, [data.user_id]: data },
      });

    case USER_NOT_EXIST:
      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: true,
        ref_pg: 0,
        all_paging_num: 0,
        users: {},
      });

    case LOGIN_FAILED:
      const failedUserInfo = action.failedUserInfo;
      return Object.assign({}, users, {
        auth_fail: true,
        is_empty: true,
        ref_pg: 0,
        all_paging_num: 0,
        users: failedUserInfo,
      });

    default:
      return users;
  }
};
