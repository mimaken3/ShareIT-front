import {
  CREATE_USER_EVENT,
  SHOW_ALL_USERS,
  SHOW_USER_DETAIL,
  UPDATE_USER_EVENT,
  USER_NOT_EXIST,
  LOGIN_FAILED,
  EMPTY_USERS,
} from "Actions/user";
import getJSTCreatedDateArr from "Modules/getJST_created_date_arr";
import _ from "lodash";

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
      // 作成日を年月日時分に変換
      const _users = action.response.data.users;
      const _users2 = getJSTCreatedDateArr(_users);

      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: action.response.data.is_empty,
        ref_pg: action.response.data.ref_pg,
        all_paging_num: action.response.data.all_paging_num,
        users: _.mapKeys(_users2, "user_id"),
      });

    case CREATE_USER_EVENT:
    case SHOW_USER_DETAIL:
      // 作成日を年月日時分に変換
      const _data = action.response.data;
      const data = getJSTCreatedDateArr(_data);
      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: false,
        ref_pg: 0,
        all_paging_num: 0,
        users: { ...users.users, [data.user_id]: data },
      });

    case UPDATE_USER_EVENT:
      // 作成日を年月日時分に変換
      const _updatedUser = action.response.data;
      const updatedUser = getJSTCreatedDateArr(_updatedUser);

      if (action.flag) {
        // ヘッダーのユーザアイコンを更新
        localStorage.removeItem("login_user_icon_URL");
        localStorage.setItem("login_user_icon_URL", updatedUser.icon_name);
      }

      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: false,
        ref_pg: 0,
        all_paging_num: 0,
        // [data.user_id]をkeyとしたdataというオブジェクトを持って、上書きした情報をまるっとわたす
        users: { ...users.users, [updatedUser.user_id]: updatedUser },
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

    case EMPTY_USERS:
      return Object.assign({}, users, {
        auth_fail: false,
        is_empty: false, // 一時的に空なのでfalse
        ref_pg: 0,
        all_paging_num: 0,
        users: {},
      });

    default:
      return users;
  }
};
