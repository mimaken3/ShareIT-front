import axios from "axios";

//reducerでもimortして使うので
export const LOGIN_USER_EVENT = "LOGIN_USER_EVENT";
export const LOGOUT_USER_EVENT = "LOGOUT_USER_EVENT";
export const CREATE_USER_EVENT = "CREATE_USER_EVENT";
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
export const UPDATE_USER_EVENT = "UPDATE_USER_EVENT";

// この下で非同期処理イベントを実行(リクエストを投げる)
// readEvents内で本来ならピュアなオブジェクトを返さないといけない
// redux-thunkを使えばそれが可能
const ROOT_URL = "https://shareit-part2-pro.appspot.com";

const shareIT_token = localStorage.getItem("shareIT_token");

// ユーザ作成
export const postUserEvent = (user) => async (dispatch) => {
  const response = await axios.post(`${ROOT_URL}/signUp`, user);
  dispatch({ type: CREATE_USER_EVENT, response });
};

// ログイン
export const loginUserEvent = (user) => async (dispatch) => {
  const response = await axios.post(`${ROOT_URL}/login`, user);
  dispatch({ type: LOGIN_USER_EVENT, response });
};

// ログアウト
export const LogoutUserEvent = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_EVENT });
};

// ユーザ一覧
export const showAllUsers = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/api/users`, {
    headers: {
      Authorization: "Bearer " + shareIT_token,
    },
  });
  dispatch({ type: SHOW_ALL_USERS, response });
};

// ユーザ詳細画面
export const getUserDetail = (userId) => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/api/users/${userId}`, {
    headers: {
      Authorization: "Bearer " + shareIT_token,
    },
  });
  dispatch({ type: SHOW_USER_DETAIL, response });
};

// ユーザ情報を更新
export const putUserEvent = (values) => async (dispatch) => {
  const response = await axios.put(
    `${ROOT_URL}/api/users/${values.user_id}`,
    values,
    {
      headers: {
        Authorization: "Bearer " + shareIT_token,
      },
    }
  );
  dispatch({ type: UPDATE_USER_EVENT, response });
};
